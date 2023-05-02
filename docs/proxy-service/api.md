# API

## `defineProxyService`

```ts
// Type
export function defineProxyService<TService extends Service, TArgs extends any[]>(
  name: string,
  init: (...args: TArgs) => TService,
  config?: ProxyServiceConfig,
): [registerService: (...args: TArgs) => TService, getService: () => ProxyService<TService>];
```

You service can also be defined as any of the following:

- Single function
- Class definition
- Plain object
- Deeply nested object containing all the above

See [Variants](./variants) for examples of using all the different types of services.

### Parameters

- `name: string`: A unique name for the service. Used to identify which service is being executed.
- `init: (...args: TArgs) => TService`: A function that returns your real service implementation. If args are listed, `registerService` will require the same set of arguments
- `config?:` [`ProxyServiceConfig`](#proxyserviceconfig): Optional configuration options.

### Returns

Returns a tuple of two functions, `registerService` and `getService`:

- `registerService`: Registers the real implmenetation of the service in the background script
- `getService`: Returns the registered service when called from the background, or a [`ProxyService`](#proxyservice) when called from anywhere else.

The [`ProxyService`](#proxyservice) uses [`@webext-core/messenger`](/messaging/) to forward messages to the background where the registered, real implementation executes the correct function.

### Example

```ts
import { defineProxyService } from '@webext-core/storage';

export const [registerService, getService] = defineProxyService(
  'TodosRepo',
  (idb: Promise<IDBPDatabase>) => ({
    async getTodo(id: string) {
      return (await idb).get('todos', id);
    },
  }),
);
```

## `ProxyService`

```ts
// Type
type ProxyService<T> = DeepAsync<T> extends T ? T : DeepAsync<T>;
```

Because of the async nature of messaging, all functions on [`ProxyService`](#proxyservice)'s are async, but your real implemenatation does not have to be async.

## `DeepAsync`

```ts
// Type
type DeepAsync<TService> = TService extends (...args: any) => any
  ? ToAsyncFunction<TService>
  : TService extends { [key: string]: any }
  ? {
      [fn in keyof TService]: DeepAsync<TService[fn]>;
    }
  : never;
```

Converts function to async functions and object's with functions to objects with async functions.

All other types of values are converted to `never`

### Example

```ts
interface SomeService {
  name: string;
  syncFn(): number;
  asyncFn(): Promise<number>;
  nested: {
    name: string;
    syncFn(): number;
    asyncFn(): Promise<number>;
  };
}

type AsyncSomeService = DeepAsync<SomeService>;
// type AsyncSomeService = {
//   name: never;
//   syncFn(): Promise<number>;
//   asyncFn(): Promise<number>;
//   nested: {
//     name: never;
//     syncFn(): Promise<number>;
//     asyncFn(): Promise<number>;
//   };
// }
```

## `flattenPromise`

```ts
// Type
function flattenPromise<T>(promise: Promise<T>): DeepAsync<T>;
```

`flattenPromise` makes it easier to work with `Promise<Dependency>` passed into your services.

It works by using a `Proxy` to await the promise internally before calling any methods.

### Example

```ts
function createTodosRepo(idbPromise: Promise<IDBPDatabase>) {
  const idb = flattenPromise(idbPromise); // [!code ++]

  return {
    async create(todo: Todo): Promise<void> {
      await (await idbPromise).add('todos', todo); // [!code --]
      await idb.add('todos', todo); // [!code ++]
    },
    // ...
  };
}
```
