import { isBackground } from './isBackground';
import { ProxyServiceConfig, InputService } from './types';
import { defineExtensionMessaging, ProtocolWithReturn } from '@webext-core/messaging';
import get from 'get-value';

type RegisterService<TService extends InputService, TArgs extends any[]> = (
  ...args: TArgs
) => TService;
type GetService<TService extends InputService> = () => TService;

export function defineProxyService<TService extends InputService, TArgs extends any[]>(
  name: string,
  init: (...args: TArgs) => TService,
  config?: ProxyServiceConfig,
): [registerService: RegisterService<TService, TArgs>, getService: GetService<TService>] {
  let service: TService | undefined;

  const messageKey = `proxy-service.${name}`;
  const { onMessage, sendMessage } = defineExtensionMessaging<{
    [key: string]: ProtocolWithReturn<{ path?: string; args: any[] }, any>;
  }>(config);

  /**
   * Create and returns a "deep" proxy. Every property that is accessed returns another proxy, and
   * when a function is called at any depth (0 to infinity), a message is sent to the background.
   */
  function createProxy(path?: string): TService {
    const wrapped = (() => {}) as TService;
    const proxy = new Proxy(wrapped, {
      // Executed when the object is called as a function
      async apply(_target, _thisArg, args) {
        const res = await sendMessage(messageKey, {
          path,
          args: args,
        });
        return res;
      },

      // Executed when accessing a property on an object
      get(target, propertyName, receiver) {
        if (propertyName === '__proxy') return Reflect.get(target, propertyName, receiver);
        if (typeof propertyName === 'symbol') return undefined;

        return createProxy(path == null ? propertyName : `${path}.${propertyName}`);
      },
    });
    // @ts-expect-error: Adding a propert
    proxy.__proxy = true;
    return proxy;
  }

  return [
    function registerService(...args) {
      service = init(...args);
      onMessage(messageKey, ({ data }) => {
        const method = data.path == null ? service : get(service ?? {}, data.path);
        if (method) return Promise.resolve(method.bind(service)(...data.args));
      });
      return service;
    },

    function getService() {
      // Create proxy for non-background
      if (!isBackground()) return createProxy();

      // Register the service if it hasn't been registered yet
      if (service == null) {
        throw Error(
          `Failed to get an instance of ${name}: in background, but registerService has not been called. Did you forget to call registerService?`,
        );
      }
      return service;
    },
  ];
}
