/*
 * Copyright 2020 The Backstage Authors
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

import { act, render, renderHook, screen } from '@testing-library/react';
import { PropsWithChildren, Suspense } from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createVersionedContextForTesting } from '@backstage/version-bridge';
import {
  routeResolutionApiRef,
  RouteResolutionApi,
  RouteFunc,
} from '@backstage/frontend-plugin-api';
import { useRouteRef } from './useRouteRef';
import { createRouteRef } from './RouteRef';
import { createExternalRouteRef } from './ExternalRouteRef';
import { createBrowserHistory } from 'history';
import { createDeferred } from '@backstage/types';
import { TestApiProvider } from '@backstage/test-utils';

describe('useRouteRef', () => {
  describe('old app system', () => {
    const context = createVersionedContextForTesting('routing-context');

    afterEach(() => {
      context.reset();
    });

    it('should resolve routes', () => {
      const resolve = jest.fn(() => () => '/hello');
      context.set({ 1: { resolve } });

      const routeRef = createRouteRef({ id: 'ref1' });

      const renderedHook = renderHook(() => useRouteRef(routeRef), {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
          <MemoryRouter initialEntries={['/my-page']} children={children} />
        ),
      });

      const routeFunc = renderedHook.result.current;
      expect(routeFunc()).toBe('/hello');
      expect(resolve).toHaveBeenCalledWith(
        routeRef,
        expect.objectContaining({
          pathname: '/my-page',
        }),
      );
    });

    it('re-resolves the routeFunc when the search parameters change', () => {
      const resolve = jest.fn(() => () => '/hello');
      context.set({ 1: { resolve } });

      const routeRef = createRouteRef({ id: 'ref1' });
      const history = createBrowserHistory();
      history.push('/my-page');

      const { rerender } = renderHook(() => useRouteRef(routeRef), {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
          <Router
            location={history.location}
            navigator={history}
            children={children}
          />
        ),
      });

      expect(resolve).toHaveBeenCalledTimes(1);

      history.push('/my-new-page');
      rerender();

      expect(resolve).toHaveBeenCalledTimes(2);
    });

    it('does not re-resolve the routeFunc the location pathname does not change', () => {
      const resolve = jest.fn(() => () => '/hello');
      context.set({ 1: { resolve } });

      const routeRef = createRouteRef({ id: 'ref1' });
      const history = createBrowserHistory();
      history.push('/my-page');

      const { rerender } = renderHook(() => useRouteRef(routeRef), {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
          <Router
            location={history.location}
            navigator={history}
            children={children}
          />
        ),
      });

      expect(resolve).toHaveBeenCalledTimes(1);

      history.push('/my-page');
      rerender();

      expect(resolve).toHaveBeenCalledTimes(1);
    });

    it('does not re-resolve the routeFunc when the search parameter changes', () => {
      const resolve = jest.fn(() => () => '/hello');
      context.set({ 1: { resolve } });

      const routeRef = createRouteRef({ id: 'ref1' });
      const history = createBrowserHistory();
      history.push('/my-page');

      const { rerender } = renderHook(() => useRouteRef(routeRef), {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
          <Router
            location={history.location}
            navigator={history}
            children={children}
          />
        ),
      });

      expect(resolve).toHaveBeenCalledTimes(1);

      history.push('/my-page?foo=bar');
      rerender();

      expect(resolve).toHaveBeenCalledTimes(1);
    });

    it('does not re-resolve the routeFunc when the hash parameter changes', () => {
      const resolve = jest.fn(() => () => '/hello');
      context.set({ 1: { resolve } });

      const routeRef = createRouteRef({ id: 'ref1' });
      const history = createBrowserHistory();
      history.push('/my-page');

      const { rerender } = renderHook(() => useRouteRef(routeRef), {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
          <Router
            location={history.location}
            navigator={history}
            children={children}
          />
        ),
      });

      expect(resolve).toHaveBeenCalledTimes(1);

      history.push('/my-page#foo');
      rerender();

      expect(resolve).toHaveBeenCalledTimes(1);
    });
  });

  describe('new app system', () => {
    it('should resolve routes using routeResolutionApi', () => {
      const routeRef = createRouteRef({ id: 'ref1' });
      const mockRouteFunc: RouteFunc<any> = jest.fn(() => '/new-route');

      const mockRouteResolutionApi: RouteResolutionApi = {
        resolve: jest.fn(() => mockRouteFunc),
      };

      const wrapper = ({ children }: PropsWithChildren<{}>) => (
        <TestApiProvider
          apis={[[routeResolutionApiRef, mockRouteResolutionApi]]}
        >
          <MemoryRouter initialEntries={['/my-page']}>{children}</MemoryRouter>
        </TestApiProvider>
      );

      const renderedHook = renderHook(() => useRouteRef(routeRef), { wrapper });

      const routeFunc = renderedHook.result.current;
      expect(routeFunc).toBe(mockRouteFunc);
      expect(mockRouteResolutionApi.resolve).toHaveBeenCalledWith(
        expect.anything(),
        { sourcePath: '/my-page' },
      );
      expect(routeFunc()).toBe('/new-route');
    });

    it('should handle optional external route refs', () => {
      const externalRouteRef = createExternalRouteRef({
        id: 'external-ref',
        optional: true,
      });

      const mockRouteResolutionApi: RouteResolutionApi = {
        resolve: jest.fn(() => undefined),
      };

      const wrapper = ({ children }: PropsWithChildren<{}>) => (
        <TestApiProvider
          apis={[[routeResolutionApiRef, mockRouteResolutionApi]]}
        >
          <MemoryRouter initialEntries={['/my-page']}>{children}</MemoryRouter>
        </TestApiProvider>
      );

      const renderedHook = renderHook(() => useRouteRef(externalRouteRef), {
        wrapper,
      });

      expect(renderedHook.result.current).toBeUndefined();
    });

    it('should wait for app finalization before resolving routes', async () => {
      const routeRef = createRouteRef({ id: 'ref1' });
      const externalRouteRef = createExternalRouteRef({
        id: 'external-ref',
        optional: true,
      });
      let finalized = false;
      const finalization = createDeferred();
      const mockRouteResolutionApi = {
        resolve: () => (finalized ? () => '/route' : undefined),
        getFinalizationPromise: () => (finalized ? undefined : finalization),
      };

      function RequiredLink() {
        const link = useRouteRef(routeRef);
        return <div>Required: {link()}</div>;
      }

      function OptionalLink() {
        const link = useRouteRef(externalRouteRef);
        return <div>Optional: {link?.() ?? 'none'}</div>;
      }

      render(
        <TestApiProvider
          apis={[[routeResolutionApiRef, mockRouteResolutionApi]]}
        >
          <MemoryRouter>
            <Suspense fallback="Waiting">
              <RequiredLink />
            </Suspense>
            <OptionalLink />
          </MemoryRouter>
        </TestApiProvider>,
      );

      expect(screen.getByText('Waiting')).toBeInTheDocument();
      expect(screen.getByText('Optional: none')).toBeInTheDocument();

      finalized = true;
      await act(async () => finalization.resolve());

      await expect(
        screen.findByText('Required: /route'),
      ).resolves.toBeInTheDocument();
      expect(screen.getByText('Optional: /route')).toBeInTheDocument();
    });
  });
});
