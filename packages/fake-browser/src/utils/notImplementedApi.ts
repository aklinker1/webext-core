import { Browser } from 'webextension-polyfill';

export function notImplementedApi<T>(api: keyof Browser): any {
  return new Proxy(
    {},
    {
      get(target, path, reciever) {
        if (path === 'reset') return () => {};
        throw Error(
          `Browser.${api}.* not implemented. Feel free to submit a PR to add support: https://github.com/aklinker1/webext-core/blob/main/packages/fake-browser`,
        );
      },
    },
  );
}
