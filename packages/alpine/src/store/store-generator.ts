import {createLogger} from '@alwatr/logger';
import alpine from 'alpinejs';

const logger = createLogger(__package_name__);

/**
 * alpineStoreGenerator Options.
 *
 * @typeParam T - The type of the default value.
 */
export type AlpineStoreGeneratorOptions<T extends DictionaryReq> = {
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
 * Generates an Alpine.js store with default value.
 *
 * @typeParam T - The type of the data.
 *
 * @param config - The configuration object for the store.
 * @returns - The initialized store instance.
 *
 * @remarks
 *
 * This function uses Alpine.js to create a reactive store with a default value.
 * The store is identified by a unique name and can be accessed and manipulated
 * throughout the application. Alpine.js stores provide a simple way to manage
 * data in your application, making it easy to keep your UI in sync with your data.
 *
 * @see {@link https://alpinejs.dev/globals/alpine-store}
 *
 * @example
 * ```
 * const store = alpineStoreGenerator({
 *   name: 'user',
 *   defaultValue: {type: 'root'},
 * });
 *
 * console.log(store.type); // Output: root
 *```
 */
export function alpineStoreGenerator<T extends DictionaryReq>(config: AlpineStoreGeneratorOptions<T>): T {
  logger.logMethodArgs?.('alpineStoreGenerator', {config});

  alpine.store(config.name, config.defaultValue);

  // Get store Proxy
  const store = alpine.store(config.name) as T;
  return store;
}
