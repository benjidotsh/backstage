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
import { startTestBackend } from '@backstage/backend-test-utils';
import { aiPlugin } from './plugin';
import request from 'supertest';

const parseConversationId = (payload: string) => {
  const conversationLine = payload
    .split('\n\n')
    .find(line => line.includes('event: conversation'));

  if (!conversationLine) {
    return undefined;
  }

  const dataLine = conversationLine
    .split('\n')
    .find(line => line.startsWith('data: '));

  if (!dataLine) {
    return undefined;
  }

  const data = JSON.parse(dataLine.replace('data: ', '')) as {
    conversation: { id: string };
  };

  return data.conversation.id;
};

describe('plugin', () => {
  it('exposes models and persists conversations for signed-in users', async () => {
    const { server } = await startTestBackend({
      features: [aiPlugin],
    });

    const modelsResponse = await request(server).get('/api/ai/models');
    expect(modelsResponse.status).toBe(200);
    expect(modelsResponse.body.items).toEqual([
      { id: 'echo', title: 'Echo (built-in)' },
    ]);

    const streamResponse = await request(server)
      .post('/api/ai/chat/stream')
      .send({ message: 'Hello', modelId: 'echo' });

    expect(streamResponse.status).toBe(200);
    expect(streamResponse.text).toContain('event: done');

    const conversationId = parseConversationId(streamResponse.text);
    expect(conversationId).toBeDefined();

    const listResponse = await request(server).get('/api/ai/conversations');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.items).toHaveLength(1);

    const conversationResponse = await request(server).get(
      `/api/ai/conversations/${conversationId}`,
    );
    expect(conversationResponse.status).toBe(200);
    expect(conversationResponse.body.messages).toHaveLength(2);
  });

  it('returns empty conversation list for guest credentials', async () => {
    const { server } = await startTestBackend({
      features: [aiPlugin],
    });

    const response = await request(server).get('/api/ai/conversations');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ items: [] });
  });
});
