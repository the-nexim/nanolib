[@nexim/alpine](../README.md) / AlpineStore

# Class: AlpineStore\<T\>

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

Provides a Alpine.js pure store implementation with logger.

#### Parameters

| Parameter | Type                                                                 | Description           |
| --------- | -------------------------------------------------------------------- | --------------------- |
| `config`  | [`AlpineStoreOptions`](../type-aliases/AlpineStoreOptions.md)\<`T`\> | Configuration object. |

#### Returns

[`AlpineStore`](AlpineStore.md)\<`T`\>

#### Example

```ts
import { AlpineStore } from '@nexim/alpine';

const { store } = new AlpineStore({
  name: 'myStore',
  defaultValue: { data: 'root' },
});
console.log(store.data); // Output: { data: 'root' }

store.data = 'user';
console.log(store.data); // Output: { data: 'user' }
```

## Properties

| Property                       | Modifier    | Type           | Description       |
| ------------------------------ | ----------- | -------------- | ----------------- |
| <a id="logger_"></a> `logger_` | `protected` | `AlwatrLogger` | -                 |
| <a id="store"></a> `store`     | `public`    | `T`            | The store's data. |
