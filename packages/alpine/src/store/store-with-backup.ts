import {localJsonStorage} from '@alwatr/local-storage';
import {parseDuration, type Duration} from '@alwatr/parse-duration';

import {AlpineStore} from './store.js';

import type {EmptyObject} from '../type.js';

export type AlpineStoreWithBackupType<T extends DictionaryReq> = {
  data: T | null;
};

export type AlpineStoreWithBackupConfig<TBase extends AlpineStoreWithBackupType<TData>, TData extends DictionaryReq> = {
  name: string;
  version: number;
  defaultValue: TBase;
  expireDuration?: Duration;
};

/**
 * Schema version `sv` that's change just when the schema changes.
 */
const schemaVersion = 1;

/**
 * StoreWithBackup class extends the Store class to provide backup and restore functionality
 * with local storage support and expiration handling.
 */
export class AlpineStoreWithBackup<TBase extends AlpineStoreWithBackupType<TData>, TData extends DictionaryReq> extends AlpineStore<TBase> {
  /**
   * Keys for storing data and expireTime in local storage.
   */
  private localStorageKey__ = {
    data: `[@nexim/alpine:data:sv${schemaVersion}]:${this.config__.name}`,
    expireTime: `[@nexim/alpine:expire-time:sv${schemaVersion}]:${this.config__.name}`,
  };

  /**
   * AlpineStoreWithBackup Constructor.
   *
   * @param {AlpineStoreWithBackupConfig} config__ - Configuration object.
   */
  constructor(private config__: AlpineStoreWithBackupConfig<TBase, TData>) {
    super(config__);

    this.handleDataExpiration__();
    this.load__();
  }

  /**
   * Saves the current data to local storage. If the data is null, it clears the stored data.
   * Updates the expiration time.
   */
  save(): void {
    this.logger_.logMethodArgs?.('save', {data: this.store.data});

    if (this.store.data === null) {
      this.clear();
      return;
    }

    localJsonStorage.setItem(this.localStorageKey__.data, this.store.data, this.config__.version);
    this.updateExpireTime__();
  }

  /**
   * Resets the data to the default store configuration and clears the stored data.
   */
  resetDataToDefault(): void {
    this.logger_.logMethod?.('resetDataToDefault');

    this.store = this.config__.defaultValue;
    this.clear();
  }

  /**
   * Clears the stored data, and expiration time from local storage.
   */
  clear(): void {
    this.logger_.logMethod?.('clear');

    localJsonStorage.removeItem(this.localStorageKey__.data, this.config__.version);
    localJsonStorage.removeItem(this.localStorageKey__.expireTime, this.config__.version);
  }

  /**
   * Handles the expiration duration by checking if the stored data has expired.
   * If expired, it clears the stored data.
   */
  private handleDataExpiration__(): void {
    if (this.config__.expireDuration == null) return;
    this.logger_.logMethod?.('handleDataExpiration__');

    const expireDuration = localJsonStorage.getItem<{time: number}>(
      this.localStorageKey__.expireTime,
      {time: 0},
      this.config__.version,
    ).time;

    if (expireDuration < Date.now()) {
      this.clear();
    }
  }

  /**
   * Loads data from local storage and updates the store's data.
   *
   * This method attempts to retrieve data from local storage using the specified key and version.
   * If the retrieved data is empty, it checks the raw value in local storage.
   * If the raw value is either an empty object or null, it logs that no data was found and returns.
   * If an error occurs during parsing, it logs the error.
   */
  private load__(): void {
    this.logger_.logMethod?.('load__');

    const newData = localJsonStorage.getItem<TData | EmptyObject>(this.localStorageKey__.data, {}, this.config__.version);

    if (Object.keys(newData).length === 0) {
      // empty object
      const rawValue = localStorage.getItem(localJsonStorage.key_(this.localStorageKey__.data, this.config__.version));
      if (rawValue === '{}' || rawValue === null) {
        this.logger_.logOther?.('no_data');

        this.resetDataToDefault();
        return;
      }

      this.logger_.error('load__', 'data_not_parsed', {localStorageKey: this.localStorageKey__});
      return;
    }
    // else: data is not empty

    this.store.data = newData as TData;
  }

  /**
   * Updates the expiration time in local storage to the current time plus the configured expiration duration.
   */
  private updateExpireTime__(): void {
    if (this.config__.expireDuration == null) return;
    this.logger_.logMethod?.('updateExpireTime__');

    const newExpireTime = Date.now() + parseDuration(this.config__.expireDuration);
    localJsonStorage.setItem(this.localStorageKey__.expireTime, {time: newExpireTime}, this.config__.version);

    this.logger_.logOther?.('updated_expire_time', {newExpireTime});
  }
}
