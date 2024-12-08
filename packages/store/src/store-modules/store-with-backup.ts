import {localJsonStorage} from '@alwatr/local-storage';
import {parseDuration, type Duration} from '@alwatr/parse-duration';

import {Store} from './store.js';

import type {EmptyObject} from '../type.js';

export type StoreWithBackupType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: DictionaryReq<any> | null;
};

export type StoreWithBackupConfig<T extends StoreWithBackupType> = {
  name: string;
  version: number;
  defaultStore: T;
  expireDuration?: Duration;
};

/**
 * StoreWithBackup class extends the Store class to provide backup and restore functionality
 * with local storage support and expiration handling.
 */
export class StoreWithBackup<T extends StoreWithBackupType> extends Store<T> {
  /**
   * Keys for storing data and expireTime in local storage.
   */
  private localStorageKey__ = {
    data: `[store.v2]:${this.config__.name}`,
    expireTime: `[store.v2]:${this.config__.name}-expire-time`,
  };

  /**
   * Constructor to initialize the StoreWithBackup instance.
   * @param config__ - Configuration object containing name, version, defaultStore, and optional expireDuration.
   */
  constructor(private config__: StoreWithBackupConfig<T>) {
    super(config__);

    this.handleExpireDuration__();
    this.load__();
  }

  /**
   * Saves the current data to local storage. If the data is null, it clears the stored data.
   * Updates the expiration time.
   */
  save(): void {
    this.logger_.logMethodArgs?.('save', this.store.data);
    if (this.store.data === null) {
      this.clear();
      return;
    }

    localJsonStorage.setItem(this.localStorageKey__.data, this.store.data, this.config__.version);
    this.updateExpireTime__();
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
   * Resets the data to the default store configuration and clears the stored data.
   */
  resetDataToDefault(): void {
    this.logger_.logMethod?.('resetDataToDefault');
    this.store = this.config__.defaultStore;
    this.clear();
  }

  /**
   * Handles the expiration duration by checking if the stored data has expired.
   * If expired, it clears the stored data.
   */
  private handleExpireDuration__(): void {
    if (this.config__.expireDuration == null) return;
    this.logger_.logMethod?.('handleExpireDuration__');

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
   * Updates the expiration time in local storage to the current time plus the configured expiration duration.
   */
  private updateExpireTime__(): void {
    if (this.config__.expireDuration == null) return;
    this.logger_.logMethod?.('updateExpireTime__');

    const newExpireTime = Date.now() + parseDuration(this.config__.expireDuration);
    localJsonStorage.setItem(this.localStorageKey__.expireTime, {time: newExpireTime}, this.config__.version);

    this.logger_.logOther?.('updated_expire_time', {newExpireTime});
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

    const newData = localJsonStorage.getItem<T | EmptyObject>(this.localStorageKey__.data, {}, this.config__.version);
    if (Object.keys(newData).length === 0) {
      const rawValue = localStorage.getItem(localJsonStorage.key_(this.localStorageKey__.data, this.config__.version));
      if (rawValue === '{}' || rawValue === null) {
        this.logger_.logOther?.('no_data');
        return;
      }

      this.logger_.error('load__', 'data_not_parsed', {localStorageKey: this.localStorageKey__});
      return;
    }

    this.store.data = newData;
  }
}
