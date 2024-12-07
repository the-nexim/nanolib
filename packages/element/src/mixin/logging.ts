import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import type {Constructor} from '../type.js';
import type {LitElement, PropertyValues} from 'lit';

// Global element index to uniquely identify each element instance
let elementIndex = /* @__PURE__ */ 0;

// Declaration of the LoggerMixinInterface class extending LitElement
export declare class LoggerMixinInterface extends LitElement {
  // Logger instance for the element
  protected logger_: AlwatrLogger;
}

/**
 * Create a mixin class that extends the provided superclass and logs the lifecycle methods of the element.
 *
 * Hint: function super() must be called in the methods to logger work.
 *
 * @param superClass - The base class to extend.
 * @returns A mixin class that extends the superclass and logs the lifecycle methods of the element.
 *
 * @example
 * import {LitElement, html} from 'lit';
 * import {LoggerMixin} from '@nexim/element';
 *
 * class MyElement extends LoggerMixin(LitElement) {
 *   protected override render() {
 *     super.render(); // must call super method to logger work
 *
 *     return html`<p>Hello, world!</p>`;
 *   }
 * }
 */
export function LoggerMixin<T extends Constructor<LitElement> = Constructor<LitElement>>
(superClass: T): Constructor<LoggerMixinInterface> & T {
  class MixinClass extends superClass {
    // Unique index for each element instance
    private elementIndex__: number = ++elementIndex;

    // Logger instance with a tag name and unique index
    protected logger_ = createLogger(`<${this.tagName.toLowerCase()}-${this.elementIndex__}>`);

    private firstUpdated__?: true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.logger_.logMethod?.('constructor');
    }

    override connectedCallback(): void {
      this.logger_.logMethod?.('connectedCallback');
      super.connectedCallback();
    }

    override disconnectedCallback(): void {
      this.logger_.logMethod?.('disconnectedCallback');
      super.disconnectedCallback();
    }

    // Override update to measure update time
    protected override update(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('update', {changedProperties});
      this.logger_.time?.(this.firstUpdated__ ? 'update-time' : 'first-update-time');
      super.update(changedProperties);
    }

    // Override firstUpdated to end the first update time measurement
    protected override firstUpdated(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('firstUpdated', {changedProperties});
      this.logger_.timeEnd?.('first-update-time');
      super.firstUpdated(changedProperties);
    }

    // Override updated to end the update time measurement
    protected override updated(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('updated', {changedProperties});

      if (this.firstUpdated__) {
        this.logger_.timeEnd?.('update-time');
      }
      else {
        this.firstUpdated__ = true;
      }

      super.updated(changedProperties);
    }

    protected override render(): unknown {
      this.logger_.logMethod?.('render');
      return;
    }

    override dispatchEvent(event: Event): boolean {
      this.logger_.logMethodArgs?.('dispatchEvent', {
        type: event.type,
        detail: (event as Event & {detail?: unknown}).detail,
      });
      return super.dispatchEvent(event);
    }

    override remove(): void {
      this.logger_.logMethod?.('remove');
      super.remove();
    }
  }

  return MixinClass as unknown as Constructor<LoggerMixinInterface> & T;
}
