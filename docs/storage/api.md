# API

## `localExtStorage`

```ts
// Type
ExtensionStorage<any>;
```

A [`ExtensionStorage`](#extensionstorage) implementation backed by the `browser.storage.local` extension storage.

No schema is applied: you can use any string for storage keys, and the values are always `any`.

:::info
See [`defineExtensionStorage`](#defineextensionstorage) for creating a type-safe [`ExtensionStorage`](#extensionstorage) implementation.
:::

### Example

```ts
import { localExtStorage } from '@webext-core/storage';

await localExtStorage.setItem('any-key', 'any-value');
```

## `syncExtStorage`

```ts
// Type
ExtensionStorage<any>;
```

A [`ExtensionStorage`](#extensionstorage) implementation backed by the `browser.storage.sync` extension storage.

No schema is applied: you can use any string for storage keys, and the values are always `any`.

:::info
See [`defineExtensionStorage`](#defineextensionstorage) for creating a type-safe [`ExtensionStorage`](#extensionstorage) implementation.
:::

### Example

```ts
import { syncExtStorage } from '@webext-core/storage';

await syncExtStorage.setItem('any-key', 'any-value');
```

## `managedExtStorage`

```ts
// Type
ExtensionStorage<any>;
```

A [`ExtensionStorage`](#extensionstorage) implementation backed by the `browser.storage.managed` extension storage.

No schema is applied: you can use any string for storage keys, and the values are always `any`.

:::info
See [`defineExtensionStorage`](#defineextensionstorage) for creating a type-safe [`ExtensionStorage`](#extensionstorage) implementation.
:::

### Example

```ts
import { managedExtStorage } from '@webext-core/storage';

await managedExtStorage.setItem('any-key', 'any-value');
```

## `defineExtensionStorage`

```ts
// Type
<TSchema = any>(storage: browser.Storage.StorageArea) => ExtensionStorage<TSchema>;
```

Returns a [`ExtensionStorage`](#extensionstorage) implementation backed by the `storage` parameter.

Accepts an optional type parameter, `TSchema`, to make the storage type-safe. See [`Typescript`](/storage/typescript) for more details on creating type-safe storages.

### Example

```ts
import { defineExtensionStorage } from '@webext-core/storage';

export const localExtStorage = defineExtensionStorage(browser.storage.local);
```

## `ExtensionStorage`

```ts
// Type
interface ExtensionStorage<TSchema> {
  clear(): Promise<void>;
  getItem<TKey>(key: TKey): Promise<Required<TSchema>[TKey] | null>;
  setItem<TKey>(key: TKey, value: TSchema[TKey]): Promise<void>;
  removeItem<TKey>(key: TKey): Promise<void>;
  onChange<TKey>(key: TKey, cb: OnChangeCallback<TSchema, TKey>): RemoveListenerCallback;
}
```

This is the interface for the storage objects exported from the package. It is similar to `localStorage`, except for a few differences:

1. It's async since the extension storage APIs are all async
2. It stores and returns any type of value, not just `string`s

### `clear`

```ts
// Type
ExtensionStorage.clear(): Promise<void>
```

Removes all stored values from the storage.

### `getItem`

```ts
// Type
ExtensionStorage.getItem<TKey>(key: TKey): Promise<Required<TSchema>[TKey] | null>;
```

Gets an item from storage. Returns `null` when the key is missing from storage, never `undefined`.

### `setItem`

```ts
// Type
ExtensionStorage.setItem<TKey>(key: TKey, value: TSchema[TKey]): Promise<void>;
```

Sets a key/value pair in storage.

:::warning Passing `undefined` for the value will result in a noop!
To remove an individual item, pass `null` for the value or call `removeItem` instead.
:::

### `removeItem`

```ts
// Type
ExtensionStorage.removeItem<TKey>(key: TKey): Promise<void>;
```

Deletes an key from storage.

### `onChange`

```ts
// Type
ExtensionStorage.onChange<TKey>(key: TKey, cb: OnChangeCallback<TSchema, TKey>): RemoveListenerCallback;
```

Adds a listener that is called when the value in storage for the specified key is changed (`newValue !== oldValue`).

To remove the listener, call the function that is returned.

#### Example

```ts
import { localExtStorage } from '@webext-core/storage';

// Setup a listener for the "key1" key
const removeListener = localExtStorage.onChange('key1', (newValue, oldValue) => {
  console.log('Changed: ', { newValue, oldValue });
});

await localExtStorage.setItem('key1', 'abc');
// log: "Changed: { newValue: 'abc', oldValue: 'null' }"

await localExtStorage.setItem('key2', '123');
// nothing logged - different key changed

await localExtStorage.setItem('key1', 'abc');
// nothing logged - same value as before

removeListener();

await localExtStorage.setItem('key1', 'def');
// nothing logged - listener was removed
```
