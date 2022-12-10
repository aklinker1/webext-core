# `@webext-core/proxy-service` Demo Extension

Demo of the proxy service module. The popup contains some buttons that when clicked, perform math operations. These operations are invoked in the foreground, but executed in the background.

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
