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
import {
  createApiRef,
  DiscoveryApi,
  FetchApi,
} from '@backstage/frontend-plugin-api';
import { ResponseError } from '@backstage/errors';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export type ChatRole = 'user' | 'assistant' | 'system';

export type ConversationSummary = {
  id: string;
  title: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
};

export type ConversationMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type ConversationDetail = {
  conversation: ConversationSummary;
  messages: ConversationMessage[];
};

export type ModelInfo = {
  id: string;
  title: string;
};

export type StreamConversationEvent = {
  conversation: ConversationSummary;
  persisted: boolean;
};

export type StreamDoneEvent = {
  conversationId: string;
  messageId: string;
  updatedAt: string;
};

export type StreamChatParams = {
  message: string;
  modelId: string;
  conversationId?: string;
  signal?: AbortSignal;
  onConversation: (event: StreamConversationEvent) => void;
  onDelta: (delta: string) => void;
  onDone: (event: StreamDoneEvent) => void;
  onError: (error: Error) => void;
};

export interface AiApi {
  listModels(): Promise<ModelInfo[]>;
  listConversations(): Promise<ConversationSummary[]>;
  getConversation(conversationId: string): Promise<ConversationDetail>;
  deleteConversation(conversationId: string): Promise<void>;
  streamChat(params: StreamChatParams): Promise<void>;
}

export const aiApiRef = createApiRef<AiApi>({
  id: 'plugin.ai.api',
});

export class AiClient implements AiApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
  }

  private async getBaseUrl(): Promise<string> {
    return await this.discoveryApi.getBaseUrl('ai');
  }

  async listModels(): Promise<ModelInfo[]> {
    const baseUrl = await this.getBaseUrl();
    const response = await this.fetchApi.fetch(`${baseUrl}/models`);
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
    const data = (await response.json()) as { items: ModelInfo[] };
    return data.items;
  }

  async listConversations(): Promise<ConversationSummary[]> {
    const baseUrl = await this.getBaseUrl();
    const response = await this.fetchApi.fetch(`${baseUrl}/conversations`);
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
    const data = (await response.json()) as { items: ConversationSummary[] };
    return data.items;
  }

  async getConversation(conversationId: string): Promise<ConversationDetail> {
    const baseUrl = await this.getBaseUrl();
    const response = await this.fetchApi.fetch(
      `${baseUrl}/conversations/${encodeURIComponent(conversationId)}`,
    );
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
    return (await response.json()) as ConversationDetail;
  }

  async deleteConversation(conversationId: string): Promise<void> {
    const baseUrl = await this.getBaseUrl();
    const response = await this.fetchApi.fetch(
      `${baseUrl}/conversations/${encodeURIComponent(conversationId)}`,
      { method: 'DELETE' },
    );
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
  }

  async streamChat(params: StreamChatParams): Promise<void> {
    const baseUrl = await this.getBaseUrl();

    await fetchEventSource(`${baseUrl}/chat/stream`, {
      fetch: this.fetchApi.fetch,
      signal: params.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: params.message,
        modelId: params.modelId,
        conversationId: params.conversationId,
      }),
      async onopen(response) {
        if (!response.ok) {
          throw await ResponseError.fromResponse(response);
        }
      },
      onmessage(message) {
        if (message.event === 'conversation') {
          const data = JSON.parse(message.data) as StreamConversationEvent;
          params.onConversation(data);
          return;
        }
        if (message.event === 'delta') {
          const data = JSON.parse(message.data) as { content: string };
          params.onDelta(data.content);
          return;
        }
        if (message.event === 'done') {
          const data = JSON.parse(message.data) as StreamDoneEvent;
          params.onDone(data);
          return;
        }
        if (message.event === 'error') {
          let errorMessage = message.data;
          try {
            const parsed = JSON.parse(message.data) as { message?: string };
            errorMessage = parsed.message ?? message.data;
          } catch {
            // ignore parse errors, use raw message data
          }
          params.onError(new Error(errorMessage));
        }
      },
      onerror(error) {
        params.onError(
          error instanceof Error ? error : new Error(String(error)),
        );
        throw error;
      },
    });
  }
}
