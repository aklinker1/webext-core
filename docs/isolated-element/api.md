# API

- <code><a href="#createisolatedelement">createIsolatedElement</a></code>
- <code><a href="#createisolatedelementoptions">CreateIsolatedElementOptions</a></code>

## <code>createIsolatedElement</code>

```ts
// Definition
declare function createIsolatedElement(options: CreateIsolatedElementOptions): Promise<{
  parentElement: HTMLElement;
  isolatedElement: HTMLElement;
  shadow: ShadowRoot;
}>;
```

Returns <code>Promise&lt;object&gt;</code>.

| Parameter | Type                                                                                  | Optional | Default | Description |
| --------- | ------------------------------------------------------------------------------------- | :------: | ------- | ----------- |
| `options` | <code><a href="#createisolatedelementoptions">CreateIsolatedElementOptions</a></code> |          |         |

## <code>CreateIsolatedElementOptions</code>

```ts
// Definition
interface CreateIsolatedElementOptions {
  name: string;
  mode?: 'open' | 'closed';
  css?:
    | {
        url: string;
      }
    | {
        textContent: string;
      };
}
```

| Field  | Type                                | Optional | Description |
| ------ | ----------------------------------- | :------: | ----------- |
| `name` | <code>string</code>                 |          |
| `mode` | <code>"closed" &#124; "open"</code> |    ✅    |
| `css`  | <code>object &#124; object</code>   |    ✅    |
