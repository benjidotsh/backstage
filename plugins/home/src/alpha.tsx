/*
 * Copyright 2023 The Backstage Authors
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
  coreExtensionData,
  createExtensionDataRef,
  createExtensionInput,
  PageBlueprint,
  createFrontendPlugin,
  createRouteRef,
  AppRootElementBlueprint,
  identityApiRef,
  storageApiRef,
  ApiBlueprint,
} from '@backstage/frontend-plugin-api';
import { compatWrapper } from '@backstage/core-compat-api';
import { VisitListener } from './components/';
import { visitsApiRef, VisitsStorageApi } from './api';

const rootRouteRef = createRouteRef();

/**
 * @alpha
 */
export const titleExtensionDataRef = createExtensionDataRef<string>().with({
  id: 'title',
});

const homePage = PageBlueprint.makeWithOverrides({
  inputs: {
    props: createExtensionInput(
      [
        coreExtensionData.reactElement.optional(),
        titleExtensionDataRef.optional(),
      ],
      {
        singleton: true,
        optional: true,
      },
    ),
  },
  factory: (originalFactory, { inputs }) => {
    return originalFactory({
      defaultPath: '/home',
      routeRef: rootRouteRef,
      loader: () =>
        import('./components/').then(m =>
          compatWrapper(
            <m.HomepageCompositionRoot
              children={inputs.props?.get(coreExtensionData.reactElement)}
              title={inputs.props?.get(titleExtensionDataRef)}
            />,
          ),
        ),
    });
  },
});

const visitListenerAppRootElement = AppRootElementBlueprint.make({
  name: 'visit-listener',
  params: {
    element: <VisitListener />,
  },
});

const visitsApi = ApiBlueprint.make({
  name: 'visits',
  params: define =>
    define({
      api: visitsApiRef,
      deps: {
        storageApi: storageApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ storageApi, identityApi }) =>
        VisitsStorageApi.create({ storageApi, identityApi }),
    }),
});

/**
 * @alpha
 */
export default createFrontendPlugin({
  pluginId: 'home',
  info: { packageJson: () => import('../package.json') },
  extensions: [homePage, visitsApi, visitListenerAppRootElement],
  routes: {
    root: rootRouteRef,
  },
});

export { homeTranslationRef } from './translation';
