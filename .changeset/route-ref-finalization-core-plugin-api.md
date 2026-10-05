---
'@backstage/core-plugin-api': patch
---

Fixed `useRouteRef` throwing a `No path for` error in new frontend system app root elements that render before the app has finished starting up. Elements that link to required routes now show a loading indicator until the app has finished starting up, and optional external routes resolve once available.
