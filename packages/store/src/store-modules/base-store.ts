import alpine from 'alpinejs';

export class BaseStore<T extends DictionaryReq> {
  store: T;

  constructor(config_: {name: string; defaultStore: T}) {
    alpine.store(config_.name, config_.defaultStore);

    /**
     * Must set the store to change proxy in class.
     */
    this.store = alpine.store(config_.name) as T;
  }
}
