# Getting Started

## Overview

`@webext-core`'s packages are provided via NPM. Depending on your project's setup, you can use them in different ways:

- If your project uses a bundler like Vite or Webpack, see [Bundler Setup](#bundler-setup).
- If your project does not use a bundler, see [Vanilla Setup](#non-bundler-setup)

## Bundler Setup

If you haven't setup a bundler yet, I recommend using [`vite`](https://vitejs.dev/) and [`vite-plugin-web-extension`](https://vite-plugin-web-extension.aklinker1.io/) for the best DX and to support all browsers.

```sh PNPM
# Bootstrap a new project
pnpm create vite-plugin-web-extnesion
```

Install any of the packages and use them normally. Everything will just work :+1:

```sh
pnpm i @webext-core/storage
```

```ts
import { localExtStorage } from '@webext-core/storage';

const value = await localExtStorage.getItem('some-key');
```

## Vanilla Setup

If you're not using a bundler, you'll have to download each package and put it inside your project.

::: details Why download them?
With Manifest V3, Google doesn't approve of extensions using CDN URLs directly, considering it "remotely hosted code" and a security risk. So you will need to download each package and ship them with your extension. See the [MV3 overview](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#remotely-hosted-code) for more details.

If you're not on MV3 yet, you could use the CDN, but it's still recommended to download it so it loads faster.
:::

All of `@webext-core` NPM packages include a minified, `lib/index.global.js` file that will create a global variable you can use to access the package's APIs.

Lets say you've put all your third-party JS files inside a `vendor/` directory, and want to install the `@webext-core/storage` package.

```
.
├─ vendor
│  └─ jquery.min.js
└─ manifest.json
```

You can download the package like so:

```sh
mkdir -p vendor/webext-core
curl -o vendor/webext-core/storage.js https://cdn.jsdelivr.net/npm/@webext-core/storage/lib/index.global.js
```

You project should now look like this:

```
.
├─ vendor
│  ├─ jquery.min.js
│  └─ webext-core
│     └─ storage.js
└─ manifest.json
```

Now you can include the `vendor/webext-core/storage.js` file in your extension! Each package sets up it's own global variable, so refer to the individual docs for that variable's name. In this case, it's `webExtCoreStorage`.

###### HTML Files

```html
<head>
  <script src="/vendor/webext-core/storage.js"></script>
  <script>
    const { localExtStorage } = webExtCoreStorage;

    const value = await localExtStorage.getItem('some-key');
  </script>
</head>
```

###### Content Scripts

```json
"content_scripts": [{
  "matches": [...],
  "js": ["vendor/webext-core/storage.js", "your-content-script.js"]
}]
```

###### MV2 Background

```json
"background": {
  "scripts": ["vendor/webext-core/storage.js", "your-background-script.js"]
}
```

###### MV3 Background

For MV3 background scripts, you need to use a bundler since `background.service_worker` only accepts a single script.
