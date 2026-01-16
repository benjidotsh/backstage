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
  mockCredentials,
  mockErrorHandler,
  mockServices,
} from '@backstage/backend-test-utils';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';
import { ConversationModelRegistry } from './models/ConversationModelRegistry';
import { ConversationStore } from './database/DatabaseConversationStore';
import { ConversationSummary } from './models/types';

const mockConversation: ConversationSummary = {
  id: 'conv-1',
  title: 'Hello',
  modelId: 'echo',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('createRouter', () => {
  let app: express.Express;
  let store: jest.Mocked<ConversationStore>;
  let registry: ConversationModelRegistry;

  beforeEach(async () => {
    store = {
      createConversation: jest.fn(),
      listConversations: jest.fn(),
      getConversation: jest.fn(),
      getConversationMessages: jest.fn(),
      addMessage: jest.fn(),
      updateConversationUpdatedAt: jest.fn(),
      softDeleteConversation: jest.fn(),
    };

    registry = new ConversationModelRegistry();
    registry.registerModel({
      info: { id: 'echo', title: 'Echo' },
      async *stream() {
        yield 'Hello';
      },
    });

    const router = await createRouter({
      httpAuth: mockServices.httpAuth(),
      logger: mockServices.logger.mock(),
      store,
      modelRegistry: registry,
      guestUserEntityRef: 'user:default/guest',
    });
    app = express();
    app.use(router);
    app.use(mockErrorHandler());
  });

  it('returns registered models', async () => {
    const response = await request(app).get('/models');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      items: [{ id: 'echo', title: 'Echo' }],
    });
  });

  it('returns empty conversations for guests', async () => {
    const response = await request(app)
      .get('/conversations')
      .set('Authorization', mockCredentials.none.header());

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ items: [] });
  });

  it('streams chat responses and persists for users', async () => {
    store.createConversation.mockResolvedValue(mockConversation);
    store.addMessage.mockResolvedValue({
      id: 'msg-1',
      role: 'assistant',
      content: 'Hello',
      createdAt: new Date().toISOString(),
    });

    const response = await request(app)
      .post('/chat/stream')
      .send({ message: 'Hi', modelId: 'echo' });

    expect(response.status).toBe(200);
    expect(response.text).toContain('event: conversation');
    expect(response.text).toContain('event: delta');
    expect(response.text).toContain('event: done');
  });
});
