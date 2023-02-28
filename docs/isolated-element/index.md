# Get Started

## Overview

`@webext-core/isolated-element` uses the [`ShadowRoot` API](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot) to create a custom element who's CSS is completely separate from the page it's injected into.

It will let you load UIs from content scripts without worrying about the page's CSS effecting your UI, no iframe needed!

## Installation

###### Bundler

```ts
pnpm i @webext-core/isolated-element
```

```ts
import { createIsolatedElement } from '@webext-core/isolated-element';
```

###### Vanilla

```sh
curl -o isolated-element.js https://cdn.jsdelivr.net/npm/@webext-core/isolated-element/lib/index.global.js
```

```html
<script src="/isolated-element.js"></script>
<script>
  const { createIsolatedElement } = webExtCoreIsolatedElement;
</script>
```

## Usage

`createIsolatedElement` returns two elements:

- `parentElement` needs to be added to the DOM where you want your UI to show up.
- `isolatedElement` is where you should mount your UI.

Here, we're creating the UI using vanilla JS.

```ts
// content-script.ts
import { createIsolatedElement } from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';

const { parentElement, isolatedElement } = await createIsolatedElement({
  name: 'some-name',
  css: {
    url: browser.runtime.getURL('/path/to/styles.css'),
  },
});

// Mount our UI inside the isolated element
const ui = document.createElement('div');
ui.textContent = 'Isolated text';
isolatedElement.appendChild(ui);

// Add the UI to the DOM
document.body.append(parentElement);
```

Here's a couple of other ways to mount your UI inside the `isolatedElement`:

### Vue

```ts
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount(isolatedElement);
```

### React

```ts
import ReactDOM from 'react-dom';
import App from './App.tsx';

ReactDOM.createRoot(isolatedElement).render(<App />);
```

## Options

| Option | Type                                           | Required |  Default   | Description                                                                                                             |
| :----- | :--------------------------------------------- | :------: | :--------: | :---------------------------------------------------------------------------------------------------------------------- |
| `name` | `string`                                       |    ✅    |            | A unique tag name used when defining the web component used internally. Don't use the same name twice for different UIs |
| `css`  | `{ url: string }` or `{ textContent: string }` |          |            | Either the URL to a CSS file or the text contents of a CSS file                                                         |
| `mode` | `"open"` or `"closed"`                         |          | `"closed"` | See [`ShadowRoot.mode`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)                               |
