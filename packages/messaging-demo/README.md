# `@webext-core/messaging` Demo Extension

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
