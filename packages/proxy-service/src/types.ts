import { ExtensionMessagingConfig } from '@webext-core/messaging';

export type Proimsify<T> = T extends Promise<any> ? T : Promise<T>;

export type Service = ((...args: any[]) => Promise<any>) | { [key: string]: any | Service };

/**
 * A type that ensures a service has only async methods.
 * - ***If all methods are async***, it returns the original type.
 * - ***If the service has non-async methods***, it returns a `DeepAsync` of the service.
 */
export type ProxyService<TService> = TService extends DeepAsync<TService>
  ? TService
  : DeepAsync<TService>;

/**
 * A recursive type that deeply converts all methods in `TService` to be async.
 */
export type DeepAsync<TService> = TService extends (...args: any) => any
  ? ToAsyncFunction<TService>
  : TService extends { [key: string]: any }
  ? {
      [fn in keyof TService]: DeepAsync<TService[fn]>;
    }
  : never;

type ToAsyncFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Proimsify<ReturnType<T>>;

/**
 * Configure a proxy service's behavior. It uses `@webext-core/messaging` internally, so any
 * config from `ExtensionMessagingConfig` can be passed as well.
 */
export interface ProxyServiceConfig extends ExtensionMessagingConfig {}
