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
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { conversationModelExtensionPoint } from './extensions';
import { ConversationModelRegistry } from './models/ConversationModelRegistry';
import { defaultEchoModel } from './models/defaultModel';
import { DatabaseConversationStore } from './database/DatabaseConversationStore';

/**
 * aiPlugin backend plugin
 *
 * @public
 */
export const aiPlugin = createBackendPlugin({
  pluginId: 'ai',
  register(env) {
    const modelRegistry = new ConversationModelRegistry();
    env.registerExtensionPoint(conversationModelExtensionPoint, modelRegistry);

    env.registerInit({
      deps: {
        config: coreServices.rootConfig,
        database: coreServices.database,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
      },
      async init({ config, database, httpAuth, httpRouter, logger }) {
        if (!modelRegistry.hasModels()) {
          modelRegistry.registerModel(defaultEchoModel);
        }

        const store = await DatabaseConversationStore.create({ database });
        const guestUserEntityRef =
          config.getOptionalString('auth.providers.guest.userEntityRef') ??
          config.getOptionalString('ai.guestUserEntityRef') ??
          'user:default/guest';

        httpRouter.use(
          await createRouter({
            httpAuth,
            logger,
            store,
            modelRegistry,
            guestUserEntityRef,
          }),
        );
      },
    });
  },
});
