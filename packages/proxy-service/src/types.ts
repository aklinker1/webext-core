import { ExtensionMessagingConfig } from '@webext-core/messaging';

export type Proimsify<T> = T extends Promise<any> ? T : Promise<T>;

type ToAsyncFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Proimsify<ReturnType<T>>;

/**
 * Make all functions at all nested levels of an object async
 */
export type DeepAsync<TService> = TService extends (...args: any) => any
  ? ToAsyncFunction<TService>
  : {
      [fn in keyof TService]: TService[fn] extends (...args: any[]) => any
        ? ToAsyncFunction<TService[fn]>
        : TService[fn] extends { [key: string]: any }
        ? DeepAsync<TService[fn]>
        : TService[fn];
    };

export type Service = ((...args: any[]) => Promise<any>) | { [key: string]: any | Service };

export interface ProxyServiceConfig extends ExtensionMessagingConfig {}
