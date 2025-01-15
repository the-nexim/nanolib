[@nexim/financial-calculate](../README.md) / calculatePercentageProfit

# Function: calculatePercentageProfit()

> **calculatePercentageProfit**(`marketPrice`: `number`, `salePrice`: `number`, `decimal`: `number`): `number`

Calculates the discount percentage between the market price and the sale price for profit.

## Parameters

| Parameter     | Type     | Default value | Description                                                                           |
| ------------- | -------- | ------------- | ------------------------------------------------------------------------------------- |
| `marketPrice` | `number` | `undefined`   | The original market price of the item.                                                |
| `salePrice`   | `number` | `undefined`   | The sale price of the item.                                                           |
| `decimal`     | `number` | `2`           | The number of decimal places to round the result to(optional with default value = 2). |

## Returns

`number`

## Example

```ts
calculatePercentageProfit(100, 80); // Returns 20.00
calculatePercentageProfit(100, 80, 1, false); // Returns 25.0
```
