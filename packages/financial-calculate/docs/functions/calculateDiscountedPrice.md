[@nexim/financial-calculate](../README.md) / calculateDiscountedPrice

# Function: calculateDiscountedPrice()

> **calculateDiscountedPrice**(`price`: `number`, `discount`: `number`, `decimal`: `number`): `number`

Calculate the price after applying a discount.

## Parameters

| Parameter  | Type     | Default value | Description                                              |
| ---------- | -------- | ------------- | -------------------------------------------------------- |
| `price`    | `number` | `undefined`   | The original price.                                      |
| `discount` | `number` | `undefined`   | The discount percentage to apply.                        |
| `decimal`  | `number` | `2`           | The number of decimal places to round to (default is 2). |

## Returns

`number`

## Example

```ts
calculateDiscountedPrice(100, 10, 1); // returns 90.0
```
