import type {Constructor} from '../type.js';
import type {LitElement, CSSResultGroup, ReactiveElement} from 'lit';

export function LightDomMixin<T extends Constructor<LitElement>>(superClass: T): T {
  class MixinClass extends superClass {
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

    // Render template into light DOM
    override createRenderRoot() {
      return this;
    }

    // Add light dom class when the element is connected to the DOM
    override connectedCallback() {
      super.connectedCallback();
      MixinClass.lightDomStyles(this.tagName.toLowerCase(), this.constructor as typeof LitElement);
    }
  }

  return MixinClass as unknown as T;
}
