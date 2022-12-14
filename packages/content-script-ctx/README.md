# `@webext-core/contet-script-ctx`

Prevent "invalidated context" errors by automatically stopping your content script when the
extension reloads. This is useful during development, when reloading your extension often, and during production, when the extension recieves an update, forcing the extension to reload.

```bash
pnpm i @webext-core/content-script-ctx
```

> This extension will not automatically reload the content script for you on chrome. You will need to manually refresh the page.

## Usage

In your content scripts, don't execute anything in the top-level scope. Instead, call `defineContentScript` and execute top-level code inside the callback.

```ts
import {defineContentScript} from '@webext-core/content-script-ctx';
import Browser from 'webextension-polyfill';

defineContentScript("example", (ctx) => {
  // Listen for events
  Browser.runtime.onMessage.addListener(() => {
    ...
  });

  // Use context aware methods for delaying code execution
  ctx.setTimeout(() => ...);
  ctx.setInterval(() => ...);
  ctx.requestAnimationFrame(() => ...);

  function sendMessage() {
    // Only call Browser APIs if in a valid context.
    if (ctx.isValid()) Browser.runtime.sendMessage(...);
  }
});
```

You must pass a content script name into `defineContentScript`. Build tools can use the name to reload individual scripts instead of all scripts in dev mode.

> There are no build tools that take advantage of this feature right now. I am planning on building one though!

## Extending `ctx`

By default, `ctx` only includes a few context aware methods: `setTimeout`, `setInterval`, and `requestAnimationFrame`. You will likely need more methods that prevent execution after the script's context is invalidated.

You can extend the `ctx` variable using the `extendContentScriptContext` method!

```ts
import { extendContentScriptContext } from '@webext-core/content-script-ctx';
import { Runtime } from 'webextension-polyfill';

export const defineContentScript = extendContentScriptContext(ctx => {
  // Example async operation
  const sendMessage: Runtime.RuntimeStatic['sendMessage'] = (...args) => {
    // Perform the operation if valid
    if (ctx.isValid()) return Browser.runtime.sendMessage(...args);
    // Return a promise that never resolves if invalid, effectively freezing this process
    else return new Promise();
  };

  // Example event listener
  const onMessage: Runtime.RuntimeState['onMessage']['addListener'] = listener => {
    Browser.runtime.onMessage.addListener(listener);
    ctx.onInvalidated(() => Browser.runtime.onMessage.removeListener(listener));
  };

  return {
    ...ctx,
    sendMessage,
    onMessage,
  };
});
```
