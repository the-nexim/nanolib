[@nexim/financial-calculate](../README.md) / calculateDiscountAmount

# Function: calculateDiscountAmount()

> **calculateDiscountAmount**(`price`: `number`, `discount`: `number`, `decimal`: `number`): `number`

Calculate the discount amount from the original price.

## Parameters

| Parameter  | Type     | Default value | Description                                              |
| ---------- | -------- | ------------- | -------------------------------------------------------- |
| `price`    | `number` | `undefined`   | The original price.                                      |
| `discount` | `number` | `undefined`   | The discount percentage.                                 |
| `decimal`  | `number` | `2`           | The number of decimal places to round to (default is 2). |

## Returns

`number`

## Example

```ts
calculateDiscountAmount(100, 10, 1); // returns 10.0
```
