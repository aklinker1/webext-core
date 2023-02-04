# TypeScript

## Adding Type Safety

If your project uses TypeScript, you can make your storage interactions type-safe by passing a schema into the first type parameter of `defineExtensionStorage`.

```ts
import { defineExtensionStorage } from '@webext-core/storage';
import browser from 'webextension-polyfill';

export interface LocalExtStorageSchema {
  installDate: number;
  notificationsEnabled: boolean;
  favoriteUrls: string[];
}

export const localExtStorage = defineExtensionStorage<LocalExtStorageSchema>(browser.storage.local);
```

Then, when you use this `localExtStorage`, not the one exported from the package, you'll get type errors when using keys not in the schema:

```ts
localExtStorage.getItem('unknownKey');
//                      ~~~~~~~~~~~~ Error: 'unknownKey' does not match `keyof LocalExtStorageSchema`

const installDate: Date = await localExtStorage.getItem('installDate');
//    ~~~~~~~~~~~~~~~~~ Error: value of type 'number' cannot be assigned to type 'Date'

await localExtStorage.setItem('favoriteUrls', 'not-an-array');
//                                            ~~~~~~~~~~~~~~ Error: type 'string' is not assignable to 'string[]'
```

When used correctly, types will be automatically inferred:

```ts
const installDate /*: number | null */ = await localExtStorage.getItem('installDate');
await localExtStorage.setItem('installDate', 123);

const notificationsEnalbed /*: boolean | null */ = await localExtStorage.getItem(
  'notificationsEnalbed',
);

const favorites /*: string[] | null */ = await localExtStorage.getItem('favoriteUrls');
favorites ??= [];
favorites.push('https://github.com');
await localExtSTorage.setItem('favoriteUrls', favorites);
```

## Hanlding `null` Correctly

When using a schema, you'll notice that `getItem` returns `T | null`, but `setItem` requires the value being set to not be null.

By default, getting items from storage could always return `null` if a value hasn't been set. But if you type the schema as required fields, you're only be allowed to set non-null values.

If you want a key to be "optional" in storage, add `null` to it's type, then you'll be able to set

```diff
export interface LocalExtStorageSchema {
  installDate: number;
- notificationsEnabled: boolean;
+ notificationsEnabled: boolean | null;
  favoriteUrls: string[];
}
```

## Never Use `undefined`

Missing storage values will always be returned as `null`, never as `undefined`. So you shouldn't use `?:` or `| undefined` since that doesn't represent the actual type of your values.

```diff
export interface LocalExtStorageSchema {
- key1?: number;
+ key1: number | null;
- key2: string | undefined;
+ key2: string | null;
}
```
