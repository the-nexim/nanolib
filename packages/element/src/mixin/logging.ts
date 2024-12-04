import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import type {LitElement, PropertyValues} from 'lit';
import type {Constructor} from 'types';

let elementIndex = 0;

export declare class LoggerMixinInterface extends LitElement {
  /**
   * Logger index!
   *
   * Element index for logger ;)
   */
  elementIndex_: number;

  protected logger_: AlwatrLogger;
}

export function LoggerMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<LoggerMixinInterface> & T {
  class MixinClass extends superClass {
    protected elementIndex_: number = ++elementIndex;
    protected logger_ = createLogger(`<${this.tagName.toLowerCase()}-${this.elementIndex_}>`);

    private _$firstUpdated?: true;

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
      this.logger_.time?.(this._$firstUpdated ? 'update-time' : 'first-update-time');
      super.update(changedProperties);
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('firstUpdated', {changedProperties});
      this.logger_.timeEnd?.('first-update-time');
      super.firstUpdated(changedProperties);
    }

    protected override updated(changedProperties: PropertyValues): void {
      this.logger_.logMethodArgs?.('updated', {changedProperties});

      if (this._$firstUpdated) {
        this.logger_.timeEnd?.('update-time');
      }
      else {
        this._$firstUpdated = true;
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
