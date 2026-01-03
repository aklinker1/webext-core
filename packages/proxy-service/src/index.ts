import get from 'get-value';
import { DeepAsync } from './types';
import {
  defineExtensionMessaging,
  ExtensionMessagingConfig,
  ExtensionMessenger,
  RemoveListenerCallback,
} from '@webext-core/messaging';

/**
 * A type that ensures a service has only async methods.
 *
 * - ***If all methods are async***, it returns the original type.
 * - ***If the service has non-async methods***, it returns a `DeepAsync` of the service.
 */
export type ProxyService<T> = T extends DeepAsync<T> ? T : DeepAsync<T>;

/**
 * Create a proxy service that uses the message APIs to proxy function calls to
 * the real service registered in the background with `registerProxyService`.
 *
 * @param key The service key to listen for, must be the same string as the one
 *            used in `registerProxyService`.
 */
export function createProxyService<T>(
  key: ProxyServiceKey<T> | string,
  config?: ExtensionMessagingConfig,
): ProxyService<T> {
  return createProxy(defineProxyMessaging(key, config));
}

/**
 * Sets up message listeners that receive messages from proxies created with
 * `createProxyService`.
 *
 * @param key The service key to listen for, must be the same string as the one
 *            used in `createProxyService`.
 * @param realService The real service instance that will handle the requests.
 */
export function registerProxyService<T, K extends string = ProxyServiceKey<T> | string>(
  key: K,
  realService: T,
  config?: ExtensionMessagingConfig,
): RemoveListenerCallback {
  const messenger = defineProxyMessaging(key, config);

  return messenger.onMessage(messenger.messageKey, ({ data }) => {
    const method = data.path == null ? realService : get(realService ?? {}, data.path);
    if (method) return Promise.resolve(method.bind(realService)(...data.args));
  });
}

export function isProxyService<T>(obj: unknown): obj is ProxyService<T> {
  // @ts-expect-error
  return obj?.[ProxyServiceSymbol] === true;
}

interface ProxyServiceConstraint<_> {}

/**
 * Used to constrain a service's type between calls to `createProxyService` and
 * `registerProxyService`.
 *
 * @example
 * ```ts
 * // utils/proxy-service-keys.ts
 * import type { ProxyServiceKey } from '@webext-core/proxy-service';
 * import type { MathService } from './math-service';
 *
 * export const ProxyServiceKey = {
 *   MathService: 'MathService' as ProxyServiceKey<MathService>,
 * }
 *
 * // background.ts
 * import { ProxyServiceKey } from './utils/proxy-service-keys';
 *
 * registerProxyService(ProxyServiceKey.MathService, new MathService())
 *
 * // content-script.ts
 * import { ProxyServiceKey } from './utils/proxy-service-keys';
 *
 * const mathService = await createProxyService(ProxyServiceKey.MathService);
 * ```
 */
export type ProxyServiceKey<T> = string & ProxyServiceConstraint<T>;

type ProxyMessengerProtocolMap = {
  [key: string]: (arg: { path?: string; args: any[] }) => any;
};
type ProxyMessenger = ExtensionMessenger<ProxyMessengerProtocolMap> & { messageKey: string };

function defineProxyMessaging(
  key: string,
  config: ExtensionMessagingConfig | undefined,
): ProxyMessenger {
  const messaging = defineExtensionMessaging<ProxyMessengerProtocolMap>(config);
  return {
    messageKey: `proxy-service.${key}`,
    ...messaging,
  };
}

/**
 * Create and returns a "deep" proxy. Every property that is accessed returns
 * another proxy, and when a function is called at any depth, a message is sent
 * to the background.
 */
function createProxy<T>(messenger: ProxyMessenger, path?: string): ProxyService<T> {
  const wrapped = (() => {}) as ProxyService<T>;

  const proxy = new Proxy(wrapped, {
    async apply(_target, _thisArg, args) {
      const res = await messenger.sendMessage(messenger.messageKey, {
        path,
        args: args,
      });
      return res;
    },

    get(target, propertyName, receiver) {
      // Return the value if the property is a symbol
      if (typeof propertyName === 'symbol') {
        return Reflect.get(target, propertyName, receiver);
      }

      // Return a new proxy for regular properties
      return createProxy(messenger, path == null ? propertyName : `${path}.${propertyName}`);
    },
  });

  // @ts-expect-error: Adding a hidden property for isProxyService to use
  proxy[ProxyServiceSymbol] = true;

  return proxy;
}

const ProxyServiceSymbol = Symbol();
