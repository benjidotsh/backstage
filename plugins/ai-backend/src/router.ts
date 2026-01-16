/*
 * Copyright 2026 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import crypto from 'node:crypto';
import { HttpAuthService, LoggerService } from '@backstage/backend-plugin-api';
import { InputError, NotFoundError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { ConversationModelRegistry } from './models/ConversationModelRegistry';
import { ChatMessageInput, ConversationSummary } from './models/types';
import { ConversationStore } from './database/DatabaseConversationStore';

const chatSchema = z.object({
  message: z.string().min(1),
  modelId: z.string().min(1),
  conversationId: z.string().optional(),
});

const createTitle = (message: string) => {
  const trimmed = message.trim();
  if (!trimmed) {
    return 'Untitled';
  }
  return trimmed.length > 60 ? `${trimmed.slice(0, 60)}…` : trimmed;
};

export async function createRouter({
  httpAuth,
  logger,
  store,
  modelRegistry,
  guestUserEntityRef,
}: {
  httpAuth: HttpAuthService;
  logger: LoggerService;
  store: ConversationStore;
  modelRegistry: ConversationModelRegistry;
  guestUserEntityRef: string;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  const resolveUserContext = async (req: express.Request) => {
    const credentials = await httpAuth.credentials(req, {
      allow: ['user', 'none'],
    });

    if (credentials.principal.type === 'none') {
      return { isGuest: true, userEntityRef: undefined };
    }

    const userEntityRef = credentials.principal.userEntityRef;
    const isGuest = userEntityRef === guestUserEntityRef;

    return { isGuest, userEntityRef };
  };

  router.get('/models', async (_req, res) => {
    res.json({ items: modelRegistry.listModels() });
  });

  router.get('/conversations', async (req, res) => {
    const { isGuest, userEntityRef } = await resolveUserContext(req);
    if (isGuest || !userEntityRef) {
      res.json({ items: [] });
      return;
    }

    res.json({ items: await store.listConversations({ userEntityRef }) });
  });

  router.get('/conversations/:id', async (req, res) => {
    const { isGuest, userEntityRef } = await resolveUserContext(req);
    if (isGuest || !userEntityRef) {
      throw new NotFoundError('Conversation not found');
    }

    const conversation = await store.getConversation({
      userEntityRef,
      conversationId: req.params.id,
    });
    const messages = await store.getConversationMessages({
      userEntityRef,
      conversationId: req.params.id,
    });

    res.json({ conversation, messages });
  });

  router.delete('/conversations/:id', async (req, res) => {
    const { isGuest, userEntityRef } = await resolveUserContext(req);
    if (isGuest || !userEntityRef) {
      throw new NotFoundError('Conversation not found');
    }

    await store.softDeleteConversation({
      userEntityRef,
      conversationId: req.params.id,
    });

    res.status(204).end();
  });

  router.post('/chat/stream', async (req, res) => {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const { message, modelId, conversationId } = parsed.data;
    const { isGuest, userEntityRef } = await resolveUserContext(req);

    let conversationSummary: ConversationSummary | null = null;
    let conversationMessages: ChatMessageInput[] = [];
    let conversationIdToUse = conversationId ?? crypto.randomUUID();
    let resolvedModelId = modelId;
    let persisted = false;

    if (!isGuest && userEntityRef) {
      if (conversationId) {
        const existing = await store.getConversation({
          userEntityRef,
          conversationId,
        });
        conversationSummary = existing;
        resolvedModelId = existing.modelId;
        conversationIdToUse = existing.id;

        const history = await store.getConversationMessages({
          userEntityRef,
          conversationId: existing.id,
        });
        conversationMessages = history.map(item => ({
          role: item.role,
          content: item.content,
        }));
      } else {
        conversationSummary = await store.createConversation({
          userEntityRef,
          title: createTitle(message),
          modelId,
        });
        conversationIdToUse = conversationSummary.id;
      }

      persisted = true;
      await store.addMessage({
        conversationId: conversationIdToUse,
        role: 'user',
        content: message,
      });
    }

    const model = modelRegistry.getModel(resolvedModelId);
    if (!model) {
      throw new InputError(`Unknown model '${resolvedModelId}'`);
    }

    const now = new Date().toISOString();
    const transientSummary: ConversationSummary = conversationSummary ?? {
      id: conversationIdToUse,
      title: createTitle(message),
      modelId: resolvedModelId,
      createdAt: now,
      updatedAt: now,
    };

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
    });

    const writeEvent = (event: string, data: unknown) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      if (res.flush) {
        res.flush();
      }
    };

    writeEvent('conversation', {
      conversation: transientSummary,
      persisted,
    });

    const controller = new AbortController();
    req.on('close', () => {
      controller.abort();
      res.end();
    });

    const assistantChunks: string[] = [];

    try {
      for await (const chunk of model.stream({
        messages: [...conversationMessages, { role: 'user', content: message }],
        signal: controller.signal,
      })) {
        if (controller.signal.aborted) {
          return;
        }
        assistantChunks.push(chunk);
        writeEvent('delta', { content: chunk });
      }

      const updatedAt = new Date().toISOString();
      let messageId = crypto.randomUUID();

      if (!isGuest && userEntityRef) {
        const assistantMessage = await store.addMessage({
          conversationId: conversationIdToUse,
          role: 'assistant',
          content: assistantChunks.join(''),
        });
        messageId = assistantMessage.id;
        await store.updateConversationUpdatedAt({
          conversationId: conversationIdToUse,
          updatedAt,
        });
      }

      writeEvent('done', {
        conversationId: conversationIdToUse,
        messageId,
        updatedAt,
      });
      res.end();
    } catch (error) {
      logger.error('Chat stream failed', error as Error);
      writeEvent(
        'error',
        error instanceof Error ? error.message : String(error),
      );
      res.end();
    }
  });

  return router;
}
