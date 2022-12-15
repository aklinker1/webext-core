import { isBackground } from './isBackground';
import { AsyncService, ProxyServiceConfig, Service } from './types';
import { defineExtensionMessaging, ProtocolWithReturn } from '@webext-core/messaging';

type RegisterService<TService extends Service, TArgs extends any[]> = (...args: TArgs) => TService;
type GetService<TService extends Service> = () => AsyncService<TService>;

export function defineProxyService<TService extends Service, TArgs extends any[]>(
  name: string,
  init: (...args: TArgs) => TService,
  config?: ProxyServiceConfig,
): [registerService: RegisterService<TService, TArgs>, getService: GetService<TService>] {
  let service: TService | undefined;

  const messageKey = `proxy-service.${name}`;
  const { onMessage, sendMessage } = defineExtensionMessaging<{
    [key: string]: ProtocolWithReturn<{ method: keyof TService; args: any[] }, any>;
  }>(config);

  return [
    function registerService(...args) {
      service = init(...args);
      onMessage(messageKey, ({ data }) => {
        const method = service?.[data.method];
        if (method) return Promise.resolve(method.bind(service)(...data.args));
      });
      return service;
    },

    function getService() {
      // Create proxy for non-background
      if (!isBackground())
        return new Proxy<TService>({} as TService, {
          get(_, path) {
            return async (...args: any[]) => {
              const res = await sendMessage(messageKey, {
                method: path as keyof TService,
                args,
              });
              return res;
            };
          },
        });

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
