# Browser Support

## Overview

The `@webext-core` packages are simple wrappers around [`webextension-polyfill`](https://www.npmjs.com/package/webextension-polyfill) by Mozilla. As such, they will work on:

| Browser               | Supported Versions |
| --------------------- | :----------------: |
| Chrome                |       >= 87        |
| Firefox               |       >= 78        |
| Safari _<sup>1</sup>_ |       >= 14        |
| Edge                  |       >= 88        |

> _Safari <sup>1</sup>_: Safari define's both Chrome's `chrome` and Firefox's `browser` globals, which `webextension-polyfill` handles automatically. However, Safari does not implement the complete standard. See the [browser compatibliity chart](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs) for more details.

Other Chromium-based browsers will work as well. See Mozilla's [supported browsers documentation](https://github.com/mozilla/webextension-polyfill#supported-browsers) for more details.
