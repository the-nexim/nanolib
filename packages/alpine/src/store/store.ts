import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import {alpineStoreGenerator} from './store-generator.js';

/**
 * Options for creating an Alpine store.
 *
 * @template T - The type of the default value.
 * @property {string} name - The name of the store.
 * @property {T} defaultValue - The default state of the store.
 */
export type AlpineStoreOptions<T extends DictionaryReq> = {
  name: string;
  defaultValue: T;
};

/**
 * Provides a Alpine.js store implementation with logging capabilities in the class.
 *
 * @template T - The type of the store's state.
 * @description This class provides a simple way to create and manage a store with a default state and logging capabilities.
 *
 * @example
 *
 * interface StoreType {
 *   name: 'user',
 *   defaultValue: {
 *     type: 'root' | 'user';
 *     // Add more properties here
 *   },
 * }
 *
 * class UserProfile extends AlpineStore<StoreType> {
 *   constructor() {
 *     super({
 *       name: 'user',
 *       defaultStore: {
 *         type: 'root'
 *       }
 *     })
 *
 *     console.log(this.store.type) // output: root
 *   }
 * }
 *
 * @description
 * The AlpineStore class leverages Alpine.js to create a reactive store that holds a default value.
 * Each store is uniquely identified by a name and can be accessed and manipulated throughout the application.
 * This class simplifies state management, ensuring that your UI remains in sync with the underlying data.
 */
export class AlpineStore<T extends DictionaryReq> {
  store: T;
  protected logger_: AlwatrLogger;

  /**
   * Create an Alpine store.
   *
   * @param {AlpineStoreOptions<T>} config - The configuration options for the store.
   */
  constructor(config: AlpineStoreOptions<T>) {
    this.store = alpineStoreGenerator<T>(config);
    this.logger_ = createLogger(`[${__package_name__}:${config.name}]`);
  }
}
