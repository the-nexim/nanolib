[@nexim/service-worker](../README.md) / registerServiceWorker

# Function: registerServiceWorker()

> **registerServiceWorker**(`options`: `object`): `Promise`\<`void`\>

Register the service worker and handle updates.

## Parameters

| Parameter                    | Type                                                                  | Description                                                                 |
| ---------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `options`                    | \{ `serviceWorkerPath`: `string`; `timeForAutoUpdate`: `Duration`; \} | An object containing the service worker path and optional auto-update time. |
| `options.serviceWorkerPath`  | `string`                                                              | The path to the service worker.                                             |
| `options.timeForAutoUpdate`? | `Duration`                                                            | Optional duration for automatically updating the service worker.            |

## Returns

`Promise`\<`void`\>

## Example

```ts
import {registerServiceWorker} from '@nexim/service-worker';

const serviceWorkerPath = '/service-worker.js';

// without auto update
registerServiceWorker({serviceWorkerPath});

// with auto update
registerServiceWorker({serviceWorkerPath, timeForAutoUpdate: '10m'});
```
