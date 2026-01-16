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
import { ConversationModel, ModelInfo } from './types';
import { ConversationModelExtensionPoint } from '../extensions';

export class ConversationModelRegistry
  implements ConversationModelExtensionPoint
{
  private readonly models = new Map<string, ConversationModel>();

  registerModel(model: ConversationModel): void {
    if (this.models.has(model.info.id)) {
      throw new Error(`Model '${model.info.id}' is already registered`);
    }
    this.models.set(model.info.id, model);
  }

  hasModels(): boolean {
    return this.models.size > 0;
  }

  getModel(id: string): ConversationModel | undefined {
    return this.models.get(id);
  }

  listModels(): ModelInfo[] {
    return Array.from(this.models.values()).map(model => model.info);
  }
}
