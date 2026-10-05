---
'@backstage/frontend-plugin-api': patch
---

Fixed `useRouteRef` staying `undefined` in app root elements that render before the app has finished starting up, for example during sign-in. The route now resolves once the app is fully initialized.
