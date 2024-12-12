import {type AlwatrLogger, createLogger} from '@alwatr/logger';

import {alpineStoreGenerator} from './store-generator.js';

/**
 * AlpineStore Options.
 *
 * @template T - The type of the store value.
 * @param {string} name - The name of the store.
 * @param {T} defaultValue - The default value of the store.
 */
export type AlpineStoreOptions<T extends DictionaryReq> = {
  name: string;
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
   * @param {AlpineStoreOptions} config - Configuration object.
   *
   * @example
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
   */
  constructor(config: AlpineStoreOptions<T>) {
    this.logger_ = createLogger(`${__package_name__}:${config.name}`);
    this.logger_.logMethodArgs?.('constructor', config);

    this.store = alpineStoreGenerator(config);
  }
}
