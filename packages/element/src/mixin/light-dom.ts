import {lightDomStyles} from '../lib/lit-light-dom-style.js';

import type {Constructor} from '../lib/type.js';
import type {LitElement} from 'lit';

export function LightDomMixin<T extends Constructor<LitElement>>(superClass: T): T {
  class MixinClass extends superClass {
    // Render template into light DOM
    override createRenderRoot() {
      return this;
    }

    // Add light dom class when the element is connected to the DOM
    override connectedCallback() {
      super.connectedCallback();
      lightDomStyles(this.localName, this.constructor as typeof LitElement);
    }
  }

  return MixinClass as unknown as T;
}
