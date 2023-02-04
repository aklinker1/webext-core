# Browser Support

## Overview

All `@webext-core` packages will work on:

- **Google Chrome** (and other Chromium-based browsers)
- **Firefox**

The packages are just wrappers around the [`webextension-polyfill`](https://www.npmjs.com/package/webextension-polyfill) by Mozilla.

See their [supported browsers documentation](https://github.com/mozilla/webextension-polyfill#supported-browsers) for more details.

### Safari?

Safari define's both Chrome's `chrome` and Firefox's `browser` globals, but neither is a complete implemenation of the web extension standard.

`@webext-core` packages will work on Safari as long as you are using one of the implemented APIs. See the [browser compatibliity chart](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs) for more details.

## The Future of MV3

Mozilla has confirmed that they will not be removing some of the APIs from Firefox that Google is removing from Chrome in MV3, like the `webRequest` API.

Right now, the way `webextension-polyfill` handles missing APIs is the `browser.apiName` object becomes `undefined`.

A good example of this is the MV2 `browserAction` and MV3 `action` APIs. Since MV3 dropped support for `browserAction`, you just need to check if the API exists before using it:

```ts
import browser from 'webextension-polyfill'

const action = browser.action ?? browser.browserAction;
action.setIcon({ ... });
```

It's likely that as MV3 is finalized and adopted, a similar approach will need to be taken for APIs that are only available on specific browsers.
