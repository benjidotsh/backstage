---
'@backstage/core-plugin-api': patch
---

Fixed `useRouteRef` throwing a `No path for` error in new frontend system app root elements that render before the app has finished starting up. Required routes now wait until the app is fully initialized, and optional external routes resolve once available.
