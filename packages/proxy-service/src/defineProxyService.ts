import { isBackground } from './isBackground';
import { ProxyService, ProxyServiceConfig, Service } from './types';
import { defineExtensionMessaging, ProtocolWithReturn } from '@webext-core/messaging';
import get from 'get-value';

/**
 * Utility for creating a service whose functions are executed in the background script regardless
 * of the JS context the they are called from.
 *
 * @param name A unique name for the service. Used to identify which service is being executed.
 * @param init A function that returns your real service implementation. If args are listed,
 *             `registerService` will require the same set of arguments.
 * @param config
 * @returns
 * - `registerService`: Used to register your service in the background
 * - `getService`: Used to get an instance of the service anywhere in the extension.
 */
export function defineProxyService<TService extends Service, TArgs extends any[]>(
  name: string,
  init: (...args: TArgs) => TService,
  config?: ProxyServiceConfig,
): [registerService: (...args: TArgs) => TService, getService: () => ProxyService<TService>] {
  let service: TService | undefined;

  const messageKey = `proxy-service.${name}`;
  const { onMessage, sendMessage } = defineExtensionMessaging<{
    [key: string]: ProtocolWithReturn<{ path?: string; args: any[] }, any>;
  }>(config);

  /**
   * Create and returns a "deep" proxy. Every property that is accessed returns another proxy, and
   * when a function is called at any depth (0 to infinity), a message is sent to the background.
   */
  function createProxy(path?: string): ProxyService<TService> {
    const wrapped = (() => {}) as ProxyService<TService>;
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
        if (propertyName === '__proxy' || typeof propertyName === 'symbol') {
          return Reflect.get(target, propertyName, receiver);
        }
        return createProxy(path == null ? propertyName : `${path}.${propertyName}`);
      },
    });
    // @ts-expect-error: Adding a hidden property
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
      return service as ProxyService<TService>;
    },
  ];
}
