# `@webext-core/isolated-element`

Need to inject a UI onto a webpage from a content script? Isolating your CSS from the webpage's CSS is hard, but that's where this library comes in.

It uses the [`ShadowRoot` API](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot) to create a custom element who's CSS is completely separate from the page it's on.

```bash
pnpm i @webext-core/isolated-element
```

## Usage

`createIsolatedElement` returns two elements:

- `parentElement` needs to be added to the DOM where you want your UI to show up.
- `isolatedElement` is where you should mount your UI.

Here, we're mounting a Vanilla JS app inside the isolated element.

###### content-script.ts

```ts
import { createIsolatedElement } from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';

const  = createIsolatedElement({
  name: 'some-name',
  css: browser.runtime.getURL('/path/to/styles.css'),
}).then(({ parentElement, isolatedElement }) => {
  // Mount our UI inside the isolated element
  const ui = document.createElement('div');
  ui.textContent = 'Isolated UI';
  isolatedElement.appendChild(ui);

  // Add the UI to the DOM
  document.body.append(parentElement);
});

```

Here's a couple of other ways to mount your UI inside the `isolatedElement`:

###### Vue

```ts
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount(isolatedElement);
```

###### React

```ts
import ReactDOM from 'react-dom';
import App from './App.tsx';

ReactDOM.createRoot(isolatedElement).render(<App />);
```

### Options

| Option | Type                                           | Required |  Default   | Description                                                                                                             |
| :----- | :--------------------------------------------- | :------: | :--------: | :---------------------------------------------------------------------------------------------------------------------- |
| `name` | `string`                                       |    ✅    |            | A unique tag name used when defining the web component used internally. Don't use the same name twice for different UIs |
| `css`  | `{ url: string }` or `{ textContent: string }` |          |            | Either the URL to a CSS file of the text contents of a CSS file                                                         |
| `tag`  | `string`                                       |          |  `"html"`  | The tag to use for the isolated element. If "html", a body and head will be created.                                    |
| `mode` | `"open"` or `"closed"`                         |          | `"closed"` | See [`ShadowRoot.mode`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)                               |
