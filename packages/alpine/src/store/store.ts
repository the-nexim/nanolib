import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import {AlpineBaseStore} from './base-store.js';

export class AlpineStore<T extends DictionaryReq> extends AlpineBaseStore<T> {
  protected logger_: AlwatrLogger;

  constructor(config_: {name: string; defaultStore: T}) {
    super(config_); // pass name and default store to set in the alpine store

    this.logger_ = createLogger(`[${__package_name__}:${config_.name}]`);
  }
}
