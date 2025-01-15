[@nexim/alpine](../README.md) / AlpineStoreWithBackupOptions

# Type Alias: AlpineStoreWithBackupOptions\<T\>

> **AlpineStoreWithBackupOptions**\<`T`\>: `object`

AlpineStoreWithBackup Options.

## Type Parameters

| Type Parameter                                                            | Description                  |
| ------------------------------------------------------------------------- | ---------------------------- |
| `T` _extends_ [`AlpineStoreWithBackupType`](AlpineStoreWithBackupType.md) | The type of the store value. |

## Type declaration

| Name                                          | Type       | Description                                           |
| --------------------------------------------- | ---------- | ----------------------------------------------------- |
| <a id="defaultvalue"></a> `defaultValue`      | `T`        | The default value of the store.                       |
| <a id="expireduration"></a> `expireDuration`? | `Duration` | Optional. The duration after which the store expires. |
| <a id="name"></a> `name`                      | `string`   | The name of the store.                                |
| <a id="version"></a> `version`                | `number`   | The version of the store.                             |
