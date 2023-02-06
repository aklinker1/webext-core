# API

- <code><a href="#defineproxyservice">defineProxyService</a></code>
- <code><a href="#proxyserviceconfig">ProxyServiceConfig</a></code>

## <code>defineProxyService</code>

```ts
// Definition
declare function defineProxyService<TService extends Service, TArgs extends any[]>(
  name: string,
  init: (...args: TArgs) => TService,
  config?: ProxyServiceConfig,
): [registerService: RegisterService<TService, TArgs>, getService: GetService<TService>];
```

Returns <code>[object, object]</code>.

| Parameter | Type                                                              | Optional | Default | Description |
| --------- | ----------------------------------------------------------------- | :------: | ------- | ----------- |
| `name`    | <code>string</code>                                               |          |         |
| `init`    | <code>object</code>                                               |          |         |
| `config`  | <code><a href="#proxyserviceconfig">ProxyServiceConfig</a></code> |    ✅    |         |

## <code>ProxyServiceConfig</code>

```ts
// Definition
interface ProxyServiceConfig extends ExtensionMessagingConfig {}
```
