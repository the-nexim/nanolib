[@nexim/service-worker](../README.md) / registerServiceWorker

# Function: registerServiceWorker()

> **registerServiceWorker**(`serviceWorkerPath`: `string`, `timeForAutoUpdate`?: `Duration`): `Promise`\<`void`\>

Register the service worker and handle updates.

## Parameters

| Parameter            | Type       | Description                                |
| -------------------- | ---------- | ------------------------------------------ |
| `serviceWorkerPath`  | `string`   | The path to the service worker.            |
| `timeForAutoUpdate`? | `Duration` | For updating automatically service worker. |

## Returns

`Promise`\<`void`\>

## Example

```ts
import {registerServiceWorker} from '@nexim/service-worker';

const serviceWorkerPath = '/service-worker.js';

// without auto update
registerServiceWorker(serviceWorkerPath);

// with auto update
registerServiceWorker(serviceWorkerPath, '10m');
```
