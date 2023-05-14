---
next:
  text: API Reference
  link: /api/storage
---

# TypeScript

## Adding Type Safety

If your project uses TypeScript, you can make your own type-safe storage by passing a schema into the first type argument of `defineExtensionStorage`.

```ts
import { defineExtensionStorage } from '@webext-core/storage';
import browser from 'webextension-polyfill';

export interface ExtensionStorageSchema {
  installDate: number;
  notificationsEnabled: boolean;
  favoriteUrls: string[];
}

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local,
);
```

Then, when you use this `extensionStorage`, not the one exported from the package, you'll get type errors when using keys not in the schema:

```ts
extensionStorage.getItem('unknownKey');
//                       ~~~~~~~~~~~~ Error: 'unknownKey' does not match `keyof LocalExtStorageSchema`

const installDate: Date = await extensionStorage.getItem('installDate');
//    ~~~~~~~~~~~~~~~~~ Error: value of type 'number' cannot be assigned to type 'Date'

await extensionStorage.setItem('favoriteUrls', 'not-an-array');
//                                             ~~~~~~~~~~~~~~ Error: type 'string' is not assignable to 'string[]'
```

When used correctly, types will be automatically inferred without having to specify the type anywhere:

```ts
const installDate /*: number | null */ = await extensionStorage.getItem('installDate');
await extensionStorage.setItem('installDate', 123);

const notificationsEnalbed /*: boolean | null */ = await extensionStorage.getItem(
  'notificationsEnalbed',
);

const favorites /*: string[] | null */ = await extensionStorage.getItem('favoriteUrls');
favorites ??= [];
favorites.push('https://github.com');
await localExtSTorage.setItem('favoriteUrls', favorites);
```

## Hanlding `null` Correctly

When using a schema, you'll notice that `getItem` returns `T | null`, but `setItem` requires a non-null value.

By default, getting items from storage could always return `null` if a value hasn't been set. But if you type the schema as required fields, you're only be allowed to set non-null values.

If you want a key to be "optional" in storage, add `null` to it's type, then you'll be able to set the value to `null`.

```ts
export interface LocalExtStorageSchema {
  installDate: number;
  notificationsEnabled: boolean; // [!code --]
  notificationsEnabled: boolean | null; // [!code ++]
  favoriteUrls: string[];
}
```

### Never Use `undefined`

Missing storage values will always be returned as `null`, never as `undefined`. So you shouldn't use `?:` or `| undefined` since that doesn't represent the actual type of your values.

```js
export interface LocalExtStorageSchema {
  key1?: number; // [!code --]
  key2: string | undefined; // [!code --]
  key1: number | null; // [!code ++]
  key2: string | null; // [!code ++]
}
```
