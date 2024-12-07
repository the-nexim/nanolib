import type {Constructor} from '../type.js';
import type {LitElement, CSSResultGroup, ReactiveElement} from 'lit';

/**
 * A mixin to enable light DOM rendering and style encapsulation for LitElement components.
 *
 * @param superClass - The base class to extend.
 * @returns A class that extends the base class with light DOM functionality.
 *
 * @example
 * import {LitElement, html, css} from 'lit';
 * import {LightDomMixin} from '@nexim/element';
 *
 * class MyLightDomElement extends LightDomMixin(LitElement) {
 *   static styles = css`
 *     p {
 *       color: blue;
 *     }
 *   `;
 *
 *   protected override render() {
 *     return html`<p>Hello, light DOM!</p>`;
 *   }
 * }
 */
export function LightDomMixin<T extends Constructor<LitElement>>(superClass: T): T {
  class MixinClass extends superClass {
    /**
     * Flattens the CSSResultGroup into a single string of CSS text.
     * @param styles - The styles to flatten.
     * @returns A string of concatenated CSS text.
     */
    static flatCssText(styles?: CSSResultGroup): string {
      if (styles === undefined) return '';
      if ('cssText' in styles) return styles.cssText.trim();
      if (Array.isArray(styles)) {
        return styles
          .map((style) => ('cssText' in style ? style.cssText : MixinClass.flatCssText(style)))
          .join('\n')
          .trim();
      }
      return '';
    }

    /**
     * Injects light DOM styles into the document head if not already present.
     *
     * @param tagName - The tag name of the custom element.
     * @param element - The element class containing the styles.
     */
    static lightDomStyles(tagName: string, element: typeof ReactiveElement): void {
      const className = `${tagName}-light-dom-style`;
      if (document.querySelector(`style.${className}`) !== null) return;

      const cssText = MixinClass.flatCssText(element.styles);
      if (cssText === '') return;

      const styleEl = document.createElement('style');
      styleEl.classList.add(className);
      styleEl.innerHTML = cssText;
      document.head.append(styleEl);
    }

    /**
     * Overrides the default render root to use the light DOM.
     */
    override createRenderRoot() {
      return this;
    }

    /**
     * Called when the element is added to the document's DOM.
     * Adds the light DOM styles to the document head.
     */
    override connectedCallback() {
      super.connectedCallback();
      MixinClass.lightDomStyles(this.tagName.toLowerCase(), this.constructor as typeof LitElement);
    }
  }

  return MixinClass as unknown as T;
}
