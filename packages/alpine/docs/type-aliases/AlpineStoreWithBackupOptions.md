[@nexim/alpine](../README.md) / AlpineStoreWithBackupOptions

# Type Alias: AlpineStoreWithBackupOptions\<T\>

> **AlpineStoreWithBackupOptions**\<`T`\>: `object`

Defined in: [store-with-backup.ts:19](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L19)

AlpineStoreWithBackup Options.

## Type Parameters

| Type Parameter                                                            | Description                  |
| ------------------------------------------------------------------------- | ---------------------------- |
| `T` _extends_ [`AlpineStoreWithBackupType`](AlpineStoreWithBackupType.md) | The type of the store value. |

## Type declaration

| Name                                          | Type       | Description                                           | Defined in                                                                                                                                                       |
| --------------------------------------------- | ---------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="defaultvalue"></a> `defaultValue`      | `T`        | The default value of the store.                       | [store-with-backup.ts:33](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L33) |
| <a id="expireduration"></a> `expireDuration`? | `Duration` | Optional. The duration after which the store expires. | [store-with-backup.ts:38](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L38) |
| <a id="name"></a> `name`                      | `string`   | The name of the store.                                | [store-with-backup.ts:23](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L23) |
| <a id="version"></a> `version`                | `number`   | The version of the store.                             | [store-with-backup.ts:28](https://github.com/the-nexim/nanolib/blob/8cd0e8c8dba849aba4b329ce483b771961c07a60/packages/alpine/src/store/store-with-backup.ts#L28) |
