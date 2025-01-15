[@nexim/alpine](../README.md) / alpineStoreGenerator

# Function: alpineStoreGenerator()

> **alpineStoreGenerator**\<`T`\>(`config`: [`AlpineStoreGeneratorOptions`](../type-aliases/AlpineStoreGeneratorOptions.md)\<`T`\>): `T`

Defined in: [store-generator.ts:50](https://github.com/the-nexim/nanolib/blob/315d91a362c34ccd2cf8cc495cfd7f00cd8946a3/packages/alpine/src/store/store-generator.ts#L50)

Generates an Alpine.js store with default value.

## Type Parameters

| Type Parameter                         | Description           |
| -------------------------------------- | --------------------- |
| `T` _extends_ `DictionaryReq`\<`any`\> | The type of the data. |

## Parameters

| Parameter | Type                                                                                   | Description                             |
| --------- | -------------------------------------------------------------------------------------- | --------------------------------------- |
| `config`  | [`AlpineStoreGeneratorOptions`](../type-aliases/AlpineStoreGeneratorOptions.md)\<`T`\> | The configuration object for the store. |

## Returns

`T`

- The initialized store instance.

## Remarks

This function uses Alpine.js to create a reactive store with a default value.
The store is identified by a unique name and can be accessed and manipulated
throughout the application. Alpine.js stores provide a simple way to manage
data in your application, making it easy to keep your UI in sync with your data.

## See

[https://alpinejs.dev/globals/alpine-store](https://alpinejs.dev/globals/alpine-store)

## Example

```ts
const store = alpineStoreGenerator({
  name: 'user',
  defaultValue: {type: 'root'},
});

console.log(store.type); // Output: root
```
