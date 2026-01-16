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
  ApiBlueprint,
  createFrontendPlugin,
  discoveryApiRef,
  fetchApiRef,
  NavItemBlueprint,
  PageBlueprint,
} from '@backstage/frontend-plugin-api';
import { RiRobot2Line } from '@remixicon/react';
import { createElement } from 'react';

import { aiApiRef, AiClient } from './api';
import { aiRouteRef } from './routes';

const AiNavIcon = ({
  fontSize,
}: {
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
}) => {
  let size = 22;

  if (fontSize === 'small') {
    size = 18;
  } else if (fontSize === 'large') {
    size = 26;
  }

  return createElement(RiRobot2Line, { size });
};

export const AiChatPage = PageBlueprint.make({
  params: {
    path: '/ai',
    routeRef: aiRouteRef,
    loader: () =>
      import('./components/AiChatPage/AiChatPage').then(m =>
        createElement(m.AiChatPage),
      ),
  },
});

export const AiNavItem = NavItemBlueprint.make({
  params: {
    title: 'AI Chat',
    icon: AiNavIcon,
    routeRef: aiRouteRef,
  },
});

export const AiApi = ApiBlueprint.make({
  params: defineParams =>
    defineParams({
      api: aiApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new AiClient({ discoveryApi, fetchApi }),
    }),
});

export const aiPlugin = createFrontendPlugin({
  pluginId: 'ai',
  extensions: [AiChatPage, AiNavItem, AiApi],
});
