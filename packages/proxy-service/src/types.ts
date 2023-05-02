import { ExtensionMessagingConfig } from '@webext-core/messaging';

export type Proimsify<T> = T extends Promise<any> ? T : Promise<T>;

export type Service = ((...args: any[]) => Promise<any>) | { [key: string]: any | Service };

/**
 * If a service is already fully async, return the original service type. If the service isn't
 * completely async, it should return `DeepAsync<TService>`.
 */
export type ProxyService<TService> = TService extends DeepAsync<TService>
  ? TService
  : DeepAsync<TService>;

/**
 * Make all functions at all nested levels of an object async
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

export interface ProxyServiceConfig extends ExtensionMessagingConfig {}
