[@nexim/alpine](../README.md) / AlpineStoreWithBackup

# Class: AlpineStoreWithBackup\<T\>

Defined in: [store-with-backup.ts:51](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L51)

Provides a Alpine.js store implementation with backup and expiration.

## Extends

- [`AlpineStore`](AlpineStore.md)\<`T`\>

## Type Parameters

| Type Parameter                                                                            |
| ----------------------------------------------------------------------------------------- |
| `T` _extends_ [`AlpineStoreWithBackupType`](../type-aliases/AlpineStoreWithBackupType.md) |

## Constructors

### new AlpineStoreWithBackup()

> **new AlpineStoreWithBackup**\<`T`\>(`config__`: [`AlpineStoreWithBackupOptions`](../type-aliases/AlpineStoreWithBackupOptions.md)\<`T`\>): [`AlpineStoreWithBackup`](AlpineStoreWithBackup.md)\<`T`\>

Defined in: [store-with-backup.ts:85](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L85)

Provides a Alpine.js store implementation with backup and expiration.

#### Parameters

| Parameter  | Type                                                                                     | Description           |
| ---------- | ---------------------------------------------------------------------------------------- | --------------------- |
| `config__` | [`AlpineStoreWithBackupOptions`](../type-aliases/AlpineStoreWithBackupOptions.md)\<`T`\> | Configuration object. |

#### Returns

[`AlpineStoreWithBackup`](AlpineStoreWithBackup.md)\<`T`\>

#### Example

```ts
import {AlpineStoreWithBackup} from '@nexim/alpine';

const storeWithBackup = new AlpineStoreWithBackup({
  name: 'myStoreWithBackup',
  version: 1,
  defaultValue: {data: 'root'},
  expireDuration: '1d',
});

storeWithBackup.store.data = 'user';

storeWithBackup.save();
console.log(storeWithBackup.store.data); // Output: { data: 'user' }

storeWithBackup.clear();
console.log(storeWithBackup.store.data); // Output: { data: 'root' }
```

#### Overrides

[`AlpineStore`](AlpineStore.md).[`constructor`](AlpineStore.md#constructors)

## Properties

| Property                       | Modifier    | Type           | Description       | Inherited from                                                      | Defined in                                                                                                                               |
| ------------------------------ | ----------- | -------------- | ----------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="logger_"></a> `logger_` | `protected` | `AlwatrLogger` | -                 | [`AlpineStore`](AlpineStore.md).[`logger_`](AlpineStore.md#logger_) | [store.ts:31](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store.ts#L31) |
| <a id="store"></a> `store`     | `public`    | `T`            | The store's data. | [`AlpineStore`](AlpineStore.md).[`store`](AlpineStore.md#store)     | [store.ts:29](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store.ts#L29) |

## Methods

### clear()

> **clear**(): `void`

Defined in: [store-with-backup.ts:115](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L115)

Clears the stored data.

#### Returns

`void`

---

### save()

> **save**(): `void`

Defined in: [store-with-backup.ts:100](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L100)

Saves the current data to local storage. If the data is null, it clears the stored data.

Also updates the expiration time.

#### Returns

`void`
