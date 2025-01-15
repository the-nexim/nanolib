[@nexim/service-worker](../README.md) / registerServiceWorker

# Function: registerServiceWorker()

> **registerServiceWorker**(`serviceWorkerPath`: `string`): `Promise`\<`void`\>

Register the service worker and handle updates.

## Parameters

| Parameter           | Type     | Description                     |
| ------------------- | -------- | ------------------------------- |
| `serviceWorkerPath` | `string` | The path to the service worker. |

## Returns

`Promise`\<`void`\>

## Example

```ts
import {registerServiceWorker} from '@nexim/service-worker';

const serviceWorkerPath = '/service-worker.js';
registerServiceWorker(serviceWorkerPath);
```
