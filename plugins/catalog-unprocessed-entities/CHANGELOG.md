# @backstage/plugin-catalog-unprocessed-entities

## 0.2.20-next.1

### Patch Changes

- f2f133c: Internal update to use the new variant of `ApiBlueprint`.
- Updated dependencies
  - @backstage/core-compat-api@0.4.5-next.1
  - @backstage/frontend-plugin-api@0.11.0-next.0
  - @backstage/core-components@0.17.5-next.0
  - @backstage/catalog-model@1.7.5
  - @backstage/core-plugin-api@1.10.9
  - @backstage/errors@1.2.7

## 0.2.20-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-compat-api@0.4.5-next.0
  - @backstage/frontend-plugin-api@0.10.4

## 0.2.19

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.5
  - @backstage/core-components@0.17.4
  - @backstage/core-plugin-api@1.10.9
  - @backstage/core-compat-api@0.4.4
  - @backstage/frontend-plugin-api@0.10.4

## 0.2.19-next.1

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.5-next.0
  - @backstage/core-components@0.17.4-next.1
  - @backstage/core-plugin-api@1.10.9-next.0
  - @backstage/core-compat-api@0.4.4-next.1
  - @backstage/frontend-plugin-api@0.10.4-next.1

## 0.2.19-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.17.4-next.0
  - @backstage/catalog-model@1.7.4
  - @backstage/core-compat-api@0.4.4-next.0
  - @backstage/core-plugin-api@1.10.8
  - @backstage/errors@1.2.7
  - @backstage/frontend-plugin-api@0.10.4-next.0

## 0.2.18

### Patch Changes

- 18c64e9: Added the `info.packageJson` option to the plugin instance for the new frontend system.
- Updated dependencies
  - @backstage/core-components@0.17.3
  - @backstage/core-plugin-api@1.10.8
  - @backstage/frontend-plugin-api@0.10.3
  - @backstage/catalog-model@1.7.4
  - @backstage/core-compat-api@0.4.3
  - @backstage/errors@1.2.7

## 0.2.18-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.17.3-next.0
  - @backstage/frontend-plugin-api@0.10.3-next.1
  - @backstage/catalog-model@1.7.4
  - @backstage/core-compat-api@0.4.3-next.2
  - @backstage/core-plugin-api@1.10.7
  - @backstage/errors@1.2.7

## 0.2.18-next.1

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.4
  - @backstage/core-compat-api@0.4.3-next.1
  - @backstage/core-components@0.17.2
  - @backstage/core-plugin-api@1.10.7
  - @backstage/errors@1.2.7
  - @backstage/frontend-plugin-api@0.10.3-next.0

## 0.2.18-next.0

### Patch Changes

- 18c64e9: Added the `info.packageJson` option to the plugin instance for the new frontend system.
- Updated dependencies
  - @backstage/frontend-plugin-api@0.10.3-next.0
  - @backstage/core-compat-api@0.4.3-next.0

## 0.2.17

### Patch Changes

- fb58f20: Internal update to use the new `pluginId` option of `createFrontendPlugin`.
- Updated dependencies
  - @backstage/frontend-plugin-api@0.10.2
  - @backstage/core-components@0.17.2
  - @backstage/catalog-model@1.7.4
  - @backstage/core-compat-api@0.4.2
  - @backstage/core-plugin-api@1.10.7
  - @backstage/errors@1.2.7

## 0.2.17-next.3

### Patch Changes

- Updated dependencies
  - @backstage/core-compat-api@0.4.2-next.3
  - @backstage/core-components@0.17.2-next.1
  - @backstage/core-plugin-api@1.10.7-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7
  - @backstage/frontend-plugin-api@0.10.2-next.1

## 0.2.17-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.10.7-next.0
  - @backstage/core-compat-api@0.4.2-next.2
  - @backstage/core-components@0.17.2-next.1
  - @backstage/frontend-plugin-api@0.10.2-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.17-next.1

### Patch Changes

- fb58f20: Internal update to use the new `pluginId` option of `createFrontendPlugin`.
- Updated dependencies
  - @backstage/core-components@0.17.2-next.0
  - @backstage/frontend-plugin-api@0.10.2-next.0
  - @backstage/core-compat-api@0.4.2-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/core-plugin-api@1.10.6
  - @backstage/errors@1.2.7

## 0.2.17-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-compat-api@0.4.2-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/core-components@0.17.1
  - @backstage/core-plugin-api@1.10.6
  - @backstage/errors@1.2.7
  - @backstage/frontend-plugin-api@0.10.1

## 0.2.16

### Patch Changes

- ba88bfa: Added confirmation popup for delete entities in Catalog Unprocessed Entities plugin
- a47fd39: Removes instances of default React imports, a necessary update for the upcoming React 19 migration.

  <https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html>

- 2479827: Fixed the `convertTimeToLocalTimezone` function in the FailedEntities component to correctly parse ISO 8601 date strings and set the timezone to the current local timezone.
- Updated dependencies
  - @backstage/frontend-plugin-api@0.10.1
  - @backstage/core-compat-api@0.4.1
  - @backstage/core-components@0.17.1
  - @backstage/core-plugin-api@1.10.6
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.16-next.2

### Patch Changes

- a47fd39: Removes instances of default React imports, a necessary update for the upcoming React 19 migration.

  <https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html>

- Updated dependencies
  - @backstage/frontend-plugin-api@0.10.1-next.1
  - @backstage/core-compat-api@0.4.1-next.2
  - @backstage/core-components@0.17.1-next.1
  - @backstage/core-plugin-api@1.10.6-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.16-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.17.1-next.0
  - @backstage/frontend-plugin-api@0.10.1-next.0
  - @backstage/core-compat-api@0.4.1-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/core-plugin-api@1.10.5
  - @backstage/errors@1.2.7

## 0.2.16-next.0

### Patch Changes

- ba88bfa: Added confirmation popup for delete entities in Catalog Unprocessed Entities plugin
- 2479827: Fixed the `convertTimeToLocalTimezone` function in the FailedEntities component to correctly parse ISO 8601 date strings and set the timezone to the current local timezone.
- Updated dependencies
  - @backstage/core-compat-api@0.4.1-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/core-components@0.17.0
  - @backstage/core-plugin-api@1.10.5
  - @backstage/errors@1.2.7
  - @backstage/frontend-plugin-api@0.10.0

## 0.2.15

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.17.0
  - @backstage/core-plugin-api@1.10.5
  - @backstage/frontend-plugin-api@0.10.0
  - @backstage/core-compat-api@0.4.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.15-next.2

### Patch Changes

- Updated dependencies
  - @backstage/frontend-plugin-api@0.10.0-next.2
  - @backstage/core-compat-api@0.4.0-next.2
  - @backstage/core-components@0.16.5-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/core-plugin-api@1.10.4
  - @backstage/errors@1.2.7

## 0.2.15-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.5-next.0
  - @backstage/core-compat-api@0.3.7-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/core-plugin-api@1.10.4
  - @backstage/errors@1.2.7
  - @backstage/frontend-plugin-api@0.9.6-next.1

## 0.2.15-next.0

### Patch Changes

- Updated dependencies
  - @backstage/frontend-plugin-api@0.9.6-next.0
  - @backstage/core-compat-api@0.3.7-next.0

## 0.2.14

### Patch Changes

- e09d3e8: Added alpha support for the New Frontend System
- 58ec9e7: Removed older versions of React packages as a preparatory step for upgrading to React 19. This commit does not introduce any functional changes, but removes dependencies on previous React versions, allowing for a cleaner upgrade path in subsequent commits.
- Updated dependencies
  - @backstage/core-components@0.16.4
  - @backstage/frontend-plugin-api@0.9.5
  - @backstage/core-compat-api@0.3.6
  - @backstage/core-plugin-api@1.10.4
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.14-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.4-next.1
  - @backstage/catalog-model@1.7.3
  - @backstage/core-plugin-api@1.10.4-next.0
  - @backstage/errors@1.2.7

## 0.2.14-next.0

### Patch Changes

- 58ec9e7: Removed older versions of React packages as a preparatory step for upgrading to React 19. This commit does not introduce any functional changes, but removes dependencies on previous React versions, allowing for a cleaner upgrade path in subsequent commits.
- Updated dependencies
  - @backstage/core-components@0.16.4-next.0
  - @backstage/core-plugin-api@1.10.4-next.0
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.13

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.10.3
  - @backstage/core-components@0.16.3
  - @backstage/catalog-model@1.7.3
  - @backstage/errors@1.2.7

## 0.2.13-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.10.3-next.0
  - @backstage/core-components@0.16.3-next.0
  - @backstage/catalog-model@1.7.3-next.0
  - @backstage/errors@1.2.7-next.0

## 0.2.12

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.2
  - @backstage/errors@1.2.6
  - @backstage/catalog-model@1.7.2
  - @backstage/core-plugin-api@1.10.2

## 0.2.12-next.2

### Patch Changes

- Updated dependencies
  - @backstage/errors@1.2.6-next.0
  - @backstage/catalog-model@1.7.2-next.0
  - @backstage/core-components@0.16.2-next.2
  - @backstage/core-plugin-api@1.10.2-next.0

## 0.2.12-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.2-next.1
  - @backstage/catalog-model@1.7.1
  - @backstage/core-plugin-api@1.10.1
  - @backstage/errors@1.2.5

## 0.2.12-next.0

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.1
  - @backstage/core-components@0.16.2-next.0
  - @backstage/core-plugin-api@1.10.1
  - @backstage/errors@1.2.5

## 0.2.10

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.0
  - @backstage/catalog-model@1.7.1
  - @backstage/core-plugin-api@1.10.1
  - @backstage/errors@1.2.5

## 0.2.10-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.0-next.2
  - @backstage/catalog-model@1.7.0
  - @backstage/core-plugin-api@1.10.0
  - @backstage/errors@1.2.4

## 0.2.10-next.1

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.0
  - @backstage/core-components@0.16.0-next.1
  - @backstage/core-plugin-api@1.10.0
  - @backstage/errors@1.2.4

## 0.2.10-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.16.0-next.0
  - @backstage/catalog-model@1.7.0
  - @backstage/core-plugin-api@1.10.0
  - @backstage/errors@1.2.4

## 0.2.9

### Patch Changes

- e969dc7: Move `@types/react` to a peer dependency.
- Updated dependencies
  - @backstage/core-components@0.15.1
  - @backstage/core-plugin-api@1.10.0
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4

## 0.2.9-next.2

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.7.0
  - @backstage/core-components@0.15.1-next.2
  - @backstage/core-plugin-api@1.10.0-next.1
  - @backstage/errors@1.2.4

## 0.2.9-next.1

### Patch Changes

- e969dc7: Move `@types/react` to a peer dependency.
- Updated dependencies
  - @backstage/core-components@0.15.1-next.1
  - @backstage/core-plugin-api@1.10.0-next.1
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4

## 0.2.9-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.15.1-next.0
  - @backstage/core-plugin-api@1.10.0-next.0
  - @backstage/catalog-model@1.7.0
  - @backstage/errors@1.2.4

## 0.2.8

### Patch Changes

- 836127c: Updated dependency `@testing-library/react` to `^16.0.0`.
- 4f08c85: Show additional info on DevTools unprocessed entities table

  - Location path (so that it's easier to search the failed entity from the YAML URL)
  - Time info of last discovery and next refresh time so that users can be aware of it and can sort the errors based on the time.

- Updated dependencies
  - @backstage/core-components@0.15.0
  - @backstage/catalog-model@1.7.0
  - @backstage/core-plugin-api@1.9.4
  - @backstage/errors@1.2.4

## 0.2.8-next.1

### Patch Changes

- 836127c: Updated dependency `@testing-library/react` to `^16.0.0`.
- Updated dependencies
  - @backstage/core-components@0.14.11-next.1
  - @backstage/core-plugin-api@1.9.4-next.0
  - @backstage/catalog-model@1.6.0
  - @backstage/errors@1.2.4

## 0.2.8-next.0

### Patch Changes

- 4f08c85: Show additional info on DevTools unprocessed entities table

  - Location path (so that it's easier to search the failed entity from the YAML URL)
  - Time info of last discovery and next refresh time so that users can be aware of it and can sort the errors based on the time.

- Updated dependencies
  - @backstage/core-components@0.14.11-next.0
  - @backstage/catalog-model@1.6.0
  - @backstage/core-plugin-api@1.9.3
  - @backstage/errors@1.2.4

## 0.2.7

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.10
  - @backstage/catalog-model@1.6.0
  - @backstage/core-plugin-api@1.9.3
  - @backstage/errors@1.2.4

## 0.2.7-next.1

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.6.0-next.0
  - @backstage/core-components@0.14.10-next.0
  - @backstage/core-plugin-api@1.9.3
  - @backstage/errors@1.2.4

## 0.2.7-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.10-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/core-plugin-api@1.9.3
  - @backstage/errors@1.2.4

## 0.2.6

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.9
  - @backstage/catalog-model@1.5.0
  - @backstage/core-plugin-api@1.9.3
  - @backstage/errors@1.2.4

## 0.2.6-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.9-next.1

## 0.2.6-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.9-next.0
  - @backstage/core-plugin-api@1.9.3
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4

## 0.2.5

### Patch Changes

- d44a20a: Added additional plugin metadata to `package.json`.
- Updated dependencies
  - @backstage/core-components@0.14.8
  - @backstage/core-plugin-api@1.9.3
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4

## 0.2.5-next.2

### Patch Changes

- d44a20a: Added additional plugin metadata to `package.json`.
- Updated dependencies
  - @backstage/core-components@0.14.8-next.2
  - @backstage/catalog-model@1.5.0
  - @backstage/core-plugin-api@1.9.3-next.0
  - @backstage/errors@1.2.4

## 0.2.5-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.8-next.1
  - @backstage/core-plugin-api@1.9.3-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/errors@1.2.4

## 0.2.5-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.8-next.0
  - @backstage/catalog-model@1.5.0
  - @backstage/core-plugin-api@1.9.2
  - @backstage/errors@1.2.4

## 0.2.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.7
  - @backstage/catalog-model@1.5.0

## 0.2.4-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.6-next.1

## 0.2.4-next.0

### Patch Changes

- Updated dependencies
  - @backstage/catalog-model@1.5.0-next.0
  - @backstage/core-components@0.14.5-next.0
  - @backstage/core-plugin-api@1.9.2
  - @backstage/errors@1.2.4

## 0.2.3

### Patch Changes

- abfbcfc: Updated dependency `@testing-library/react` to `^15.0.0`.
- Updated dependencies
  - @backstage/core-components@0.14.4
  - @backstage/core-plugin-api@1.9.2
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4

## 0.2.3-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.4-next.0
  - @backstage/catalog-model@1.4.5
  - @backstage/core-plugin-api@1.9.1
  - @backstage/errors@1.2.4

## 0.2.2

### Patch Changes

- e8f026a: Use ESM exports of react-use library
- Updated dependencies
  - @backstage/core-components@0.14.3
  - @backstage/core-plugin-api@1.9.1
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4

## 0.2.1

### Patch Changes

- e8f026a: Use ESM exports of react-use library
- Updated dependencies
  - @backstage/core-components@0.14.2
  - @backstage/core-plugin-api@1.9.1
  - @backstage/catalog-model@1.4.5
  - @backstage/errors@1.2.4

## 0.2.0

### Minor Changes

- 924c1ac: **BREAKING**- the `@backstage/plugin-catalog-backend-module-unprocessed` constructor is now private, and have been moved to using the static `.create` method instead which now requires a `PermissionService` and `DiscoveryService`.

  If you're using this module in the old backend system you'll need to migrate to using the `.create` method and pass in the new required parameters in `packages/backend/src/plugins/catalog.ts`.

  No changes should be required if you're using the new backend system.

  ```diff
  -  const unprocessed = new UnprocessedEntitiesModule(
  -    await env.database.getClient(),
  -    router,
  -  );
  + const unprocessed = UnprocessedEntitiesModule.create({
  +    database: await env.database.getClient(),
  +    router,
  +    permissions: env.permissions,
  +    discovery: env.discovery,
  +  });

    unprocessed.registerRoutes();
  ```

  Adds the ability to delete an unprocessed entity from the `refresh_state` table. This change requires enabling permissions for your Backstage instance.

### Patch Changes

- 2b397fe: Added the `no-top-level-material-ui-4-imports` ESLint rule to aid with the migration to Material UI v5
- Updated dependencies
  - @backstage/core-components@0.14.1
  - @backstage/errors@1.2.4
  - @backstage/catalog-model@1.4.5
  - @backstage/core-plugin-api@1.9.1

## 0.1.9-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.1-next.2
  - @backstage/catalog-model@1.4.5-next.0
  - @backstage/core-plugin-api@1.9.1-next.1
  - @backstage/errors@1.2.4-next.0

## 0.1.9-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.1-next.1
  - @backstage/core-plugin-api@1.9.1-next.1
  - @backstage/catalog-model@1.4.5-next.0
  - @backstage/errors@1.2.4-next.0

## 0.1.9-next.0

### Patch Changes

- Updated dependencies
  - @backstage/errors@1.2.4-next.0
  - @backstage/core-components@0.14.1-next.0
  - @backstage/catalog-model@1.4.5-next.0
  - @backstage/core-plugin-api@1.9.1-next.0

## 0.1.8

### Patch Changes

- 9aac2b0: Use `--cwd` as the first `yarn` argument
- 8fe56a8: Widen `@types/react` dependency range to include version 18.
- Updated dependencies
  - @backstage/core-components@0.14.0
  - @backstage/catalog-model@1.4.4
  - @backstage/core-plugin-api@1.9.0
  - @backstage/errors@1.2.3

## 0.1.8-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.0-next.2
  - @backstage/catalog-model@1.4.4-next.0
  - @backstage/core-plugin-api@1.9.0-next.1
  - @backstage/errors@1.2.3

## 0.1.8-next.1

### Patch Changes

- 9aac2b0: Use `--cwd` as the first `yarn` argument
- 8fe56a8: Widen `@types/react` dependency range to include version 18.
- Updated dependencies
  - @backstage/core-components@0.14.0-next.1
  - @backstage/core-plugin-api@1.9.0-next.1
  - @backstage/catalog-model@1.4.4-next.0
  - @backstage/errors@1.2.3

## 0.1.8-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.14.0-next.0
  - @backstage/catalog-model@1.4.4-next.0
  - @backstage/core-plugin-api@1.8.3-next.0
  - @backstage/errors@1.2.3

## 0.1.7

### Patch Changes

- 4016f21: Remove some unused dependencies
- Updated dependencies
  - @backstage/core-components@0.13.10
  - @backstage/core-plugin-api@1.8.2
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3

## 0.1.7-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.8.2-next.0
  - @backstage/core-components@0.13.10-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3

## 0.1.7-next.0

### Patch Changes

- 4016f21: Remove some unused dependencies
- Updated dependencies
  - @backstage/core-components@0.13.10-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/core-plugin-api@1.8.1
  - @backstage/errors@1.2.3

## 0.1.6

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.8.1
  - @backstage/core-components@0.13.9
  - @backstage/theme@0.5.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3

## 0.1.6-next.3

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.9-next.3
  - @backstage/catalog-model@1.4.3
  - @backstage/core-plugin-api@1.8.1-next.1
  - @backstage/errors@1.2.3
  - @backstage/theme@0.5.0-next.1

## 0.1.6-next.2

### Patch Changes

- Updated dependencies
  - @backstage/theme@0.5.0-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/core-components@0.13.9-next.2
  - @backstage/core-plugin-api@1.8.1-next.1
  - @backstage/errors@1.2.3

## 0.1.6-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.9-next.1
  - @backstage/core-plugin-api@1.8.1-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/theme@0.5.0-next.0

## 0.1.6-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.8.1-next.0
  - @backstage/core-components@0.13.9-next.0
  - @backstage/theme@0.5.0-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3

## 0.1.5

### Patch Changes

- 6c2b872153: Add official support for React 18.
- a11cdb9200: Added filtering and sorting to unprocessed entities tables.
- Updated dependencies
  - @backstage/core-components@0.13.8
  - @backstage/core-plugin-api@1.8.0
  - @backstage/theme@0.4.4
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3

## 0.1.5-next.2

### Patch Changes

- [#20998](https://github.com/backstage/backstage/pull/20998) [`a11cdb9200`](https://github.com/backstage/backstage/commit/a11cdb9200077312ca92ed85b159527226574c08) Thanks [@alde](https://github.com/alde)! - Added filtering and sorting to unprocessed entities tables.

- Updated dependencies
  - @backstage/core-components@0.13.8-next.2

## 0.1.5-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.8-next.1
  - @backstage/catalog-model@1.4.3
  - @backstage/core-plugin-api@1.8.0-next.0
  - @backstage/errors@1.2.3
  - @backstage/theme@0.4.4-next.0

## 0.1.5-next.0

### Patch Changes

- 6c2b872153: Add official support for React 18.
- Updated dependencies
  - @backstage/core-components@0.13.7-next.0
  - @backstage/core-plugin-api@1.8.0-next.0
  - @backstage/theme@0.4.4-next.0
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3

## 0.1.4

### Patch Changes

- 9a1fce352e: Updated dependency `@testing-library/jest-dom` to `^6.0.0`.
- Updated dependencies
  - @backstage/core-plugin-api@1.7.0
  - @backstage/core-components@0.13.6
  - @backstage/catalog-model@1.4.3
  - @backstage/errors@1.2.3
  - @backstage/theme@0.4.3

## 0.1.4-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.6-next.2
  - @backstage/core-plugin-api@1.7.0-next.1
  - @backstage/catalog-model@1.4.3-next.0
  - @backstage/errors@1.2.3-next.0
  - @backstage/theme@0.4.3-next.0

## 0.1.4-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.6-next.1
  - @backstage/core-plugin-api@1.7.0-next.0
  - @backstage/catalog-model@1.4.2
  - @backstage/errors@1.2.2
  - @backstage/theme@0.4.2

## 0.1.4-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.7.0-next.0
  - @backstage/core-components@0.13.6-next.0
  - @backstage/catalog-model@1.4.2
  - @backstage/errors@1.2.2
  - @backstage/theme@0.4.2

## 0.1.3

### Patch Changes

- 482bb5c0bbf8: Moved `@types/react` to be a regular dependency
- 406b786a2a2c: Mark package as being free of side effects, allowing more optimized Webpack builds.
- 8cec7664e146: Removed `@types/node` dependency
- Updated dependencies
  - @backstage/core-components@0.13.5
  - @backstage/catalog-model@1.4.2
  - @backstage/core-plugin-api@1.6.0
  - @backstage/errors@1.2.2
  - @backstage/theme@0.4.2

## 0.1.3-next.3

### Patch Changes

- 406b786a2a2c: Mark package as being free of side effects, allowing more optimized Webpack builds.
- Updated dependencies
  - @backstage/catalog-model@1.4.2-next.2
  - @backstage/core-components@0.13.5-next.3
  - @backstage/core-plugin-api@1.6.0-next.3
  - @backstage/errors@1.2.2-next.0
  - @backstage/theme@0.4.2-next.0

## 0.1.3-next.2

### Patch Changes

- 8cec7664e146: Removed `@types/node` dependency
- Updated dependencies
  - @backstage/core-components@0.13.5-next.2
  - @backstage/core-plugin-api@1.6.0-next.2
  - @backstage/catalog-model@1.4.2-next.1
  - @backstage/errors@1.2.1
  - @backstage/theme@0.4.1

## 0.1.3-next.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.5-next.1
  - @backstage/catalog-model@1.4.2-next.0
  - @backstage/core-plugin-api@1.6.0-next.1
  - @backstage/errors@1.2.1
  - @backstage/theme@0.4.1

## 0.1.3-next.0

### Patch Changes

- 482bb5c0bbf8: Moved `@types/react` to be a regular dependency
- Updated dependencies
  - @backstage/core-plugin-api@1.6.0-next.0
  - @backstage/core-components@0.13.5-next.0
  - @backstage/catalog-model@1.4.1
  - @backstage/errors@1.2.1
  - @backstage/theme@0.4.1

## 0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.4
  - @backstage/core-plugin-api@1.5.3
  - @backstage/catalog-model@1.4.1
  - @backstage/errors@1.2.1
  - @backstage/theme@0.4.1

## 0.1.2-next.0

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.4-next.0
  - @backstage/core-plugin-api@1.5.3
  - @backstage/catalog-model@1.4.1
  - @backstage/errors@1.2.1
  - @backstage/theme@0.4.1

## 0.1.1

### Patch Changes

- 2c4869473155: The Catalog Unprocessed Entities plugin can now be integrated as a tab within the DevTools plugin

  - Added an export for `UnprocessedEntitiesContent`
  - Updated the `README` with images of the features
  - Adjusted the styles to fill in the available space
  - Set the table page size to 20 as 40 was causing errors in the browser console

- 57585d89f926: Export some types and API items. This allows people to call the API from different places with the ApiRef, as well
  as completely customize the client if required. Check the [README.md](https://github.com/backstage/backstage/blob/master/plugins/catalog-unprocessed-entities/README.md) to
  note what needs to be added in order to use the new `catalogUnprocessedEntitiesApiRef` exported function.
- a8fa79ccc105: Fix and improve documentation for the unprocessed entities modules.
- 267396f45bd0: Corrected the installation instructions.
- 7a9c8a9cd0ce: Fixed spacing for success message
- e6f50426333b: update some peer dependencies to silence yarn install
- 77b408fad872: install command points to correct package name
- Updated dependencies
  - @backstage/theme@0.4.1
  - @backstage/errors@1.2.1
  - @backstage/core-components@0.13.3
  - @backstage/core-plugin-api@1.5.3
  - @backstage/catalog-model@1.4.1

## 0.1.1-next.2

### Patch Changes

- Updated dependencies
  - @backstage/theme@0.4.1-next.1
  - @backstage/core-plugin-api@1.5.3-next.1
  - @backstage/core-components@0.13.3-next.2
  - @backstage/catalog-model@1.4.1-next.0
  - @backstage/errors@1.2.1-next.0

## 0.1.1-next.1

### Patch Changes

- 267396f45bd0: Corrected the installation instructions.
- 7a9c8a9cd0ce: Fixed spacing for success message
- 77b408fad872: install command points to correct package name
- Updated dependencies
  - @backstage/theme@0.4.1-next.0
  - @backstage/core-components@0.13.3-next.1
  - @backstage/core-plugin-api@1.5.3-next.0

## 0.1.1-next.0

### Patch Changes

- 2c4869473155: The Catalog Unprocessed Entities plugin can now be integrated as a tab within the DevTools plugin

  - Added an export for `UnprocessedEntitiesContent`
  - Updated the `README` with images of the features
  - Adjusted the styles to fill in the available space
  - Set the table page size to 20 as 40 was causing errors in the browser console

- 57585d89f926: Export some types and API items. This allows people to call the API from different places with the ApiRef, as well
  as completely customize the client if required. Check the [README.md](https://github.com/backstage/backstage/blob/master/plugins/catalog-unprocessed-entities/README.md) to
  note what needs to be added in order to use the new `catalogUnprocessedEntitiesApiRef` exported function.
- a8fa79ccc105: Fix and improve documentation for the unprocessed entities modules.
- Updated dependencies
  - @backstage/errors@1.2.1-next.0
  - @backstage/core-components@0.13.3-next.0
  - @backstage/catalog-model@1.4.1-next.0
  - @backstage/core-plugin-api@1.5.2
  - @backstage/theme@0.4.0

## 0.1.0

### Minor Changes

- d44fcd9829c2: Added a new plugin to expose entities which are unprocessed or have errors processing

### Patch Changes

- 493eab8c577f: Use FetchApi instead of native fetch
- Updated dependencies
  - @backstage/core-plugin-api@1.5.2
  - @backstage/core-components@0.13.2
  - @backstage/theme@0.4.0
  - @backstage/catalog-model@1.4.0
  - @backstage/errors@1.2.0

## 0.1.0-next.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.13.2-next.3
  - @backstage/catalog-model@1.4.0-next.1
  - @backstage/core-plugin-api@1.5.2-next.0
  - @backstage/errors@1.2.0-next.0
  - @backstage/theme@0.4.0-next.1

## 0.1.0-next.1

### Patch Changes

- Updated dependencies
  - @backstage/theme@0.4.0-next.1
  - @backstage/core-components@0.13.2-next.2
  - @backstage/core-plugin-api@1.5.2-next.0

## 0.1.0-next.0

### Minor Changes

- d44fcd9829c2: Added a new plugin to expose entities which are unprocessed or have errors processing

### Patch Changes

- Updated dependencies
  - @backstage/errors@1.2.0-next.0
  - @backstage/core-components@0.13.2-next.1
  - @backstage/catalog-model@1.4.0-next.0
  - @backstage/core-plugin-api@1.5.2-next.0
  - @backstage/theme@0.4.0-next.0
