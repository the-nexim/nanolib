import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import {BaseStore} from './base-store.js';

export class Store<T extends DictionaryReq> extends BaseStore<T> {
  protected logger_: AlwatrLogger;

  constructor(config_: {name: string; defaultStore: T}) {
    super(config_);
    this.logger_ = createLogger(`store.${config_.name}`);
  }
}
