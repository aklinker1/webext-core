---
titleTemplate: '@webext-core/isolated-element'
next:
  text: API Reference
  link: /api/isolated-element
---

# Isolated Element

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/isolated-element` uses the [`ShadowRoot` API](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot) to create a custom element who's CSS is completely separate from the page it's injected into. It also allows controlling event bubbling from the isolated element to the host page.

It will let you load UIs from content scripts without worrying about the page's CSS effecting your UI or events interfering with the host page, no `iframe` needed!

## Installation

###### NPM

```sh
pnpm i @webext-core/isolated-element
```

```ts
import { createIsolatedElement } from '@webext-core/isolated-element';
```

###### CDN

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
  isolateEvents: true, // or array of event names to isolate, e.g., ['click', 'keydown']
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
