[@nexim/element](../README.md) / LightDomMixin

# Function: LightDomMixin()

> **LightDomMixin**\<`T`\>(`superClass`: `T`): `T`

A mixin to enable light DOM rendering and style encapsulation for LitElement components.

## Type Parameters

| Type Parameter                        | Default type            | Description               |
| ------------------------------------- | ----------------------- | ------------------------- |
| `T` _extends_ `Class`\<`LitElement`\> | `Class`\<`LitElement`\> | The base class to extend. |

## Parameters

| Parameter    | Type |
| ------------ | ---- |
| `superClass` | `T`  |

## Returns

`T`

A class that extends the base class with light DOM functionality.

## Example

```ts
import { LitElement, html, css } from 'lit';
import { LightDomMixin } from '@nexim/element';

class MyLightDomElement extends LightDomMixin(LitElement) {
  static styles = css`
    p {
      color: blue;
    }
  `;

  protected override render() {
    return html`<p>Hello, light DOM!</p>`;
  }
}
```
