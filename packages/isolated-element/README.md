# `@webext-core/isolated-element`

Isolate content script UI's styles from the parent page and control event bubbling to the host page. Supports all browsers (Chrome, Firefox, Safari).

```bash
pnpm i @webext-core/isolated-element
```

```ts
import { createIsolatedElement } from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';

function mountUI(root: HtmlElement) {
  const text = document.createElement('p');
  text.textContent = 'Isolated text';
  root.appendChild(text);
}

const { parentElement, isolatedElement } = await createIsolatedElement({
  name: 'some-name',
  css: {
    url: browser.runtime.getURL('/path/to/styles.css'),
  },
  isolateEvents: true, // or array of event names to isolate, e.g., ['click', 'keydown']
});

mountUi(isolatedElement);
document.body.appendChild(parentElement);
```

## Get Started

See [documentation](https://webext-core.aklinker1.io/guide/isolated-element/) to get started!
