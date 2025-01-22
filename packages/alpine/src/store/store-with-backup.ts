import { type Duration, parseDuration } from '@alwatr/parse-duration';
import { AlpineStore } from './store.js';
import { localJsonStorage } from '@alwatr/local-storage';

/**
 * Type for the store's data to extends from them.
 */
export type AlpineStoreWithBackupType = {
  data: DictionaryReq | null;
};

/**
 * AlpineStoreWithBackup Options.
 *
 * @typeParam T - The type of the store value.
 */
export type AlpineStoreWithBackupOptions<T extends AlpineStoreWithBackupType> = {
  /**
   * The name of the store.
   */
  name: string;

  /**
   * The version of the store.
   */
  version: number;

  /**
   * The default value of the store.
   */
  defaultValue: T;

  /**
   * Optional. The duration after which the store expires.
   */
  expireDuration?: Duration;
};

/**
 * Version of the schema for storing data in local storage.
 *
 * Change when this schema changes.
 */
const schemaVersion = 1;

/**
 * Provides a Alpine.js store implementation with backup and expiration.
 */
export class AlpineStoreWithBackup<T extends AlpineStoreWithBackupType> extends AlpineStore<T> {
  /**
   * Keys for storing data and expire time in local storage with version.
   */
  private localStorageKey__ = {
    data: `[${__package_name__}:data:sv${schemaVersion.toString()}]:${this.config__.name}`,
    expireTime: `[${__package_name__}:expire-time:sv${schemaVersion.toString()}]:${this.config__.name}`,
  };

  /**
   * Provides a Alpine.js store implementation with backup and expiration.
   *
   * @param config__ - Configuration object.
   *
   * @example
   * ```ts
   * import {AlpineStoreWithBackup} from '@nexim/alpine';
   *
   * const storeWithBackup = new AlpineStoreWithBackup({
   *   name: 'myStoreWithBackup',
   *   version: 1,
   *   defaultValue: {data: 'root'},
   *   expireDuration: '1d',
   * });
   *
   * storeWithBackup.store.data = 'user';
   *
   * storeWithBackup.save();
   * console.log(storeWithBackup.store.data); // Output: { data: 'user' }
   *
   * storeWithBackup.clear();
   * console.log(storeWithBackup.store.data); // Output: { data: 'root' }
   * ```
   */
  constructor(private config__: AlpineStoreWithBackupOptions<T>) {
    super(config__);

    if (this.config__.expireDuration != null) {
      this.handleDataExpiration__();
    }

    this.load__();
  }

  /**
   * Saves the current data to local storage. If the data is null, it clears the stored data.
   *
   * Also updates the expiration time.
   */
  save(): void {
    this.logger_.logMethodArgs?.('save', { data: this.store.data });

    if (this.store.data === null) {
      this.clear();
      return;
    }

    localJsonStorage.setItem(this.localStorageKey__.data, this.store.data, this.config__.version);
    this.updateExpireTime__();
  }

  /**
   * Clears the stored data.
   */
  clear(): void {
    this.logger_.logMethod?.('clear');

    localJsonStorage.removeItem(this.localStorageKey__.data, this.config__.version);
    localJsonStorage.removeItem(this.localStorageKey__.expireTime, this.config__.version);

    this.store = this.config__.defaultValue;
  }

  /**
   * Handles the expiration duration by checking if the stored data has expired.
   * If expired, it clears the stored data.
   */
  private handleDataExpiration__(): void {
    this.logger_.logMethod?.('handleDataExpiration__');

    // FIXME: use null if not set, after local storage new version.
    const expireDuration = localJsonStorage.getItem<{ time: number }>(
      this.localStorageKey__.expireTime,
      { time: -1 },
      this.config__.version,
    ).time;

    if (expireDuration !== -1 && expireDuration < Date.now()) {
      this.clear();
    }
  }

  /**
   * Loads data from local storage and updates the store's data.
   *
   * When data is not found or invalid in local storage, it uses the default value.
   *
   * FIXME: remove `NonNullable` from `<T['data']>`, after local storage new version.
   */
  private load__(): void {
    this.logger_.logMethod?.('load__');

    const newData = localJsonStorage.getItem<NonNullable<T['data']>>(
      this.localStorageKey__.data,
      this.config__.defaultValue.data as NonNullable<T['data']>,
      this.config__.version,
    ) as T['data'];
    this.store.data = newData;
  }

  /**
   * Updates the expiration time in local storage to the current time plus the configured expiration duration.
   */
  private updateExpireTime__(): void {
    if (this.config__.expireDuration == null) return;
    this.logger_.logMethod?.('updateExpireTime__');

    const newExpireTime = Date.now() + parseDuration(this.config__.expireDuration);
    localJsonStorage.setItem(this.localStorageKey__.expireTime, { time: newExpireTime }, this.config__.version);

    this.logger_.logOther?.('updated_expire_time', { newExpireTime });
  }
}
