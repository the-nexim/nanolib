[@nexim/alpine](../README.md) / AlpineStore

# Class: AlpineStore\<T\>

Defined in: [store.ts:25](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store.ts#L25)

Provides a Alpine.js pure store implementation with logger.

## Extended by

- [`AlpineStoreWithBackup`](AlpineStoreWithBackup.md)

## Type Parameters

| Type Parameter                |
| ----------------------------- |
| `T` _extends_ `DictionaryReq` |

## Constructors

### new AlpineStore()

> **new AlpineStore**\<`T`\>(`config`: [`AlpineStoreOptions`](../type-aliases/AlpineStoreOptions.md)\<`T`\>): [`AlpineStore`](AlpineStore.md)\<`T`\>

Defined in: [store.ts:52](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store.ts#L52)

Provides a Alpine.js pure store implementation with logger.

#### Parameters

| Parameter | Type                                                                 | Description           |
| --------- | -------------------------------------------------------------------- | --------------------- |
| `config`  | [`AlpineStoreOptions`](../type-aliases/AlpineStoreOptions.md)\<`T`\> | Configuration object. |

#### Returns

[`AlpineStore`](AlpineStore.md)\<`T`\>

#### Example

```ts
import {AlpineStore} from '@nexim/alpine';

const {store} = new AlpineStore({
  name: 'myStore',
  defaultValue: {data: 'root'},
});
console.log(store.data); // Output: { data: 'root' }

store.data = 'user';
console.log(store.data); // Output: { data: 'user' }
```

## Properties

| Property                       | Modifier    | Type           | Description       | Defined in                                                                                                                               |
| ------------------------------ | ----------- | -------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="logger_"></a> `logger_` | `protected` | `AlwatrLogger` | -                 | [store.ts:31](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store.ts#L31) |
| <a id="store"></a> `store`     | `public`    | `T`            | The store's data. | [store.ts:29](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store.ts#L29) |
