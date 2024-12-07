import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import type {Constructor} from '../type.js';
import type {LitElement, PropertyValues} from 'lit';

let elementIndex = /* @__PURE__ */ 0;

export declare class LoggerMixinInterface extends LitElement {
  protected logger_: AlwatrLogger;
}

export function LoggerMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<LoggerMixinInterface> & T {
  class MixinClass extends superClass {
    private  elementIndex__: number = ++elementIndex;

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

    protected override update(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('update', {changedProperties});
      this.logger_.time?.(this.firstUpdated__ ? 'update-time' : 'first-update-time');
      super.update(changedProperties);
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('firstUpdated', {changedProperties});
      this.logger_.timeEnd?.('first-update-time');
      super.firstUpdated(changedProperties);
    }

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
