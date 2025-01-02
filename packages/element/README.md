# @nexim/element

![NPM Version](https://img.shields.io/npm/v/@nexim/element)
![npm bundle size](https://img.shields.io/bundlephobia/min/@nexim/element)
![Build & Lint & Test](https://github.com/the-nexim/nanolib/actions/workflows/build-lint-test.yaml/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@nexim/element)
![NPM License](https://img.shields.io/npm/l/@nexim/element)

## Overview

`@nexim/element` is a collection of utility functions and mixins for building high-performance, maintainable web components using Lit.

## Installation

```sh
npm install @nexim/element

# Or using yarn
yarn add @nexim/element
```

## API

### LoggerMixin

The LoggerMixin adds logging capabilities to your LitElement components. It logs lifecycle methods and measures update times.

```ts
import {LitElement, html} from 'lit';
import {LoggerMixin} from '@nexim/element';

class MyElement extends LoggerMixin(LitElement) {
  protected override render() {
    super.render(); // must call super method to logger work

    return html`<p>Hello, world!</p>`;
  }
}
```

### LightDomMixin

The LightDomMixin enables light DOM rendering and style encapsulation for LitElement components.

```ts
import {LitElement, html, css} from 'lit';
import {LightDomMixin} from '@nexim/element';

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
