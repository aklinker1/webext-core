# `@webext-core/content-script-ctx` Demo Extension

Demo how to use the `@webext-core/content-script-ctx` module. The extension adds a border to `google.com` that changes colors, reporting the current color back to the popup.

When you reload the extension via the `chrome://extensions` page and reload button, the animation will reset, and no "invalid context" errors will be logged.

## Running Locally

To startup the demo extension:

```bash
cd webext-core
pnpm i
pnpm build
cd packages/messaging-demo
pnpm dev
```

This will build the extension in watch mode, and open a browser.

> If a browser fails to open, create a file called `.web-extrc.yml` with the following contents:
>
> ```yml
> chromiumBinary: /path/to/your/chrome
> ```
>
> See [`web-ext` docs](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#chromium-binary) for more details.
