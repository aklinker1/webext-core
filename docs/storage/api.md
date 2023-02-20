# API

- <code><a href="#defineextensionstorage">defineExtensionStorage</a></code>
- <code><a href="#extensionstorage">ExtensionStorage</a></code>
- <code><a href="#localextstorage">localExtStorage</a></code>
- <code><a href="#managedextstorage">managedExtStorage</a></code>
- <code><a href="#syncextstorage">syncExtStorage</a></code>

## <code>defineExtensionStorage</code>

```ts
// Definition
declare function defineExtensionStorage<TSchema extends AnySchema = AnySchema>(
  storage: Storage.StorageArea,
): ExtensionStorage<TSchema>;
```

Create a storage instance with an optional type schema.

Returns <code><a href="#extensionstorage">ExtensionStorage</a>&lt;TSchema&gt;</code>.

| Parameter | Type                             | Optional | Default | Description |
| --------- | -------------------------------- | :------: | ------- | ----------- |
| `storage` | <code>Storage.StorageArea</code> |          |         |

## <code>ExtensionStorage</code>

```ts
// Definition
interface ExtensionStorage<TSchema extends AnySchema> {
  clear(): Promise<void>;
  getItem<TKey extends keyof TSchema>(key: TKey): Promise<Required<TSchema>[TKey] | null>;
  setItem<TKey extends keyof TSchema>(key: TKey, value: TSchema[TKey]): Promise<void>;
  removeItem<TKey extends keyof TSchema>(key: TKey): Promise<void>;
  onChange<TKey extends keyof TSchema>(
    key: TKey,
    cb: OnChangeCallback<TSchema, TKey>,
  ): RemoveListenerCallback;
}
```

## <code>localExtStorage</code>

```ts
// Definition
localExtStorage: ExtensionStorage<AnySchema>;
```

## <code>managedExtStorage</code>

```ts
// Definition
managedExtStorage: ExtensionStorage<AnySchema>;
```

## <code>syncExtStorage</code>

```ts
// Definition
syncExtStorage: ExtensionStorage<AnySchema>;
```
