[@nexim/google-analytics](../README.md) / initializeGoogleAnalytics

# Function: initializeGoogleAnalytics()

> **initializeGoogleAnalytics**(`trackingId`: `string`): `Promise`\<`void`\>

Initialize google analytics with tracking id.

## Parameters

| Parameter    | Type     | Description                       |
| ------------ | -------- | --------------------------------- |
| `trackingId` | `string` | The Google Analytics tracking ID. |

## Returns

`Promise`\<`void`\>

## Example

```ts
import {initializeGoogleAnalytics} from '@nexim/analytic';

initializeGoogleAnalytics('your-google-analytics-tracking-id');
```
