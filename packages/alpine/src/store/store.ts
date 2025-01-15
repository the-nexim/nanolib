import {type AlwatrLogger, createLogger} from '@alwatr/logger';

import {alpineStoreGenerator} from './store-generator.js';

/**
 * AlpineStore Options.
 *
 * @typeParam T - The type of the store value.
 */
export type AlpineStoreOptions<T extends DictionaryReq> = {
  /**
   * The name of the store.
   */
  name: string;

  /**
   * The default value of the store.
   */
  defaultValue: T;
};

/**
 * Provides a Alpine.js pure store implementation with logger.
 */
export class AlpineStore<T extends DictionaryReq> {
  /**
   * The store's data.
   */
  store: T;

  protected logger_: AlwatrLogger;

  /**
   * Provides a Alpine.js pure store implementation with logger.
   *
   * @param config - Configuration object.
   *
   * @example
   * ```ts
   * import {AlpineStore} from '@nexim/alpine';
   *
   * const {store} = new AlpineStore({
   *   name: 'myStore',
   *   defaultValue: {data: 'root'},
   * });
   * console.log(store.data); // Output: { data: 'root' }
   *
   * store.data = 'user';
   * console.log(store.data); // Output: { data: 'user' }
   * ```
   */
  constructor(config: AlpineStoreOptions<T>) {
    this.logger_ = createLogger(`${__package_name__}:${config.name}`);
    this.logger_.logMethodArgs?.('constructor', config);

    this.store = alpineStoreGenerator(config);
  }
}
