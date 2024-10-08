<!-- GENERATED FILE, DO NOT EDIT -->

# API Reference

::alert

See [`@webext-core/proxy-service`](/proxy-service/installation/)

::

## `DeepAsync`

```ts
type DeepAsync<TService> = TService extends (...args: any) => any
  ? ToAsyncFunction<TService>
  : TService extends { [key: string]: any }
    ? {
        [fn in keyof TService]: DeepAsync<TService[fn]>;
      }
    : never;
```

A recursive type that deeply converts all methods in `TService` to be async.

## `defineProxyService`

```ts
function defineProxyService<TService extends Service, TArgs extends any[]>(
  name: string,
  init: (...args: TArgs) => TService,
  config?: ProxyServiceConfig,
): [
  registerService: (...args: TArgs) => TService,
  getService: () => ProxyService<TService>,
] {
  // ...
}
```

Utility for creating a service whose functions are executed in the background script regardless
of the JS context the they are called from.

### Parameters

- ***`name: string`***<br/>A unique name for the service. Used to identify which service is being executed.

- ***`init: (...args: TArgs) => TService`***<br/>A function that returns your real service implementation. If args are listed,
`registerService` will require the same set of arguments.

- ***`config?: ProxyServiceConfig`***

### Returns 

- `registerService`: Used to register your service in the background
- `getService`: Used to get an instance of the service anywhere in the extension.

## `flattenPromise`

```ts
function flattenPromise<T>(promise: Promise<T>): DeepAsync<T> {
  // ...
}
```

Given a promise of a variable, return a proxy to that awaits the promise internally so you don't
have to call `await` twice.

> This can be used to simplify handling `Promise<Dependency>` passed in your services.

### Examples

```ts
function createService(dependencyPromise: Promise<SomeDependency>) {
  const dependency = flattenPromise(dependencyPromise);

  return {
    doSomething() {
      await dependency.someAsyncWork();
      // Instead of `await (await dependencyPromise).someAsyncWork();`
    }
  }
}
```

## `ProxyService`

```ts
type ProxyService<TService> =
  TService extends DeepAsync<TService> ? TService : DeepAsync<TService>;
```

A type that ensures a service has only async methods.
- ***If all methods are async***, it returns the original type.
- ***If the service has non-async methods***, it returns a `DeepAsync` of the service.

## `ProxyServiceConfig`

```ts
interface ProxyServiceConfig extends ExtensionMessagingConfig {}
```

Configure a proxy service's behavior. It uses `@webext-core/messaging` internally, so any
config from `ExtensionMessagingConfig` can be passed as well.

<br/><br/>

---

_API reference generated by [`docs/generate-api-references.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/generate-api-references.ts)_