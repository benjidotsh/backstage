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
import { ConversationModel } from './types';

const chunkText = (value: string, size: number) => {
  const chunks: string[] = [];
  for (let index = 0; index < value.length; index += size) {
    chunks.push(value.slice(index, index + size));
  }
  return chunks;
};

export const defaultEchoModel: ConversationModel = {
  info: {
    id: 'echo',
    title: 'Echo (built-in)',
  },
  async *stream({ messages, signal }) {
    const lastUser = [...messages].reverse().find(msg => msg.role === 'user');
    const response = lastUser
      ? `You said: “${lastUser.content}”.\n\nI am the default model. Register a LangChain model to replace me.`
      : 'Hello! Register a LangChain model to replace this default responder.';

    for (const chunk of chunkText(response, 12)) {
      if (signal?.aborted) {
        return;
      }
      yield chunk;
    }
  },
};
