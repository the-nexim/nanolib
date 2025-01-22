[@nexim/element](../README.md) / LoggerMixin

# Function: LoggerMixin()

> **LoggerMixin**\<`T`\>(`superClass`: `T`): `Class`\<[`LoggerMixinInterface`](../interfaces/LoggerMixinInterface.md)\> & `T`

Create a mixin class that extends the provided superclass and logs the lifecycle methods of the element.

Hint: function super() must be called in the methods to logger work.

## Type Parameters

| Type Parameter                        | Default type            | Description               |
| ------------------------------------- | ----------------------- | ------------------------- |
| `T` _extends_ `Class`\<`LitElement`\> | `Class`\<`LitElement`\> | The base class to extend. |

## Parameters

| Parameter    | Type |
| ------------ | ---- |
| `superClass` | `T`  |

## Returns

`Class`\<[`LoggerMixinInterface`](../interfaces/LoggerMixinInterface.md)\> & `T`

A mixin class that extends the superclass and logs the lifecycle methods of the element.

## Example

```ts
import { LitElement, html } from 'lit';
import { LoggerMixin } from '@nexim/element';

class MyElement extends LoggerMixin(LitElement) {
  protected override render() {
    super.render(); // must call super method to logger work

    return html`<p>Hello, world!</p>`;
  }
}
```
