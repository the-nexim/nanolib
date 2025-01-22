[@nexim/service-worker](../README.md) / serviceWorkerSignal

# Variable: serviceWorkerSignal

> `const` **serviceWorkerSignal**: `AlwatrSignal`\<\{ `event`: [`ServiceWorkerEvent`](../type-aliases/ServiceWorkerEvent.md); \}\>

Signal for service worker events.

## Example

```ts
import { serviceWorkerSignal } from '@nexim/service-worker';

serviceWorkerSignal.subscribe(({ event }) => {
  console.log('Service worker event:', event);
});
```
