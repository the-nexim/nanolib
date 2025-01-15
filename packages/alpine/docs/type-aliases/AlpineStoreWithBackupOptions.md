[@nexim/alpine](../README.md) / AlpineStoreWithBackupOptions

# Type Alias: AlpineStoreWithBackupOptions\<T\>

> **AlpineStoreWithBackupOptions**\<`T`\>: `object`

Defined in: [store-with-backup.ts:24](https://github.com/the-nexim/nanolib/blob/315d91a362c34ccd2cf8cc495cfd7f00cd8946a3/packages/alpine/src/store/store-with-backup.ts#L24)

AlpineStoreWithBackup Options.

## Type Parameters

| Type Parameter                                                            | Description                  |
| ------------------------------------------------------------------------- | ---------------------------- |
| `T` _extends_ [`AlpineStoreWithBackupType`](AlpineStoreWithBackupType.md) | The type of the store value. |

## Type declaration

| Name                                          | Type       | Defined in                                                                                                                                                       |
| --------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="defaultvalue"></a> `defaultValue`      | `T`        | [store-with-backup.ts:27](https://github.com/the-nexim/nanolib/blob/315d91a362c34ccd2cf8cc495cfd7f00cd8946a3/packages/alpine/src/store/store-with-backup.ts#L27) |
| <a id="expireduration"></a> `expireDuration`? | `Duration` | [store-with-backup.ts:28](https://github.com/the-nexim/nanolib/blob/315d91a362c34ccd2cf8cc495cfd7f00cd8946a3/packages/alpine/src/store/store-with-backup.ts#L28) |
| <a id="name"></a> `name`                      | `string`   | [store-with-backup.ts:25](https://github.com/the-nexim/nanolib/blob/315d91a362c34ccd2cf8cc495cfd7f00cd8946a3/packages/alpine/src/store/store-with-backup.ts#L25) |
| <a id="version"></a> `version`                | `number`   | [store-with-backup.ts:26](https://github.com/the-nexim/nanolib/blob/315d91a362c34ccd2cf8cc495cfd7f00cd8946a3/packages/alpine/src/store/store-with-backup.ts#L26) |

## Param

The name of the store.

## Param

The version of the store.

## Param

The default value of the store.

## Param

Optional. The duration after which the store expires.
