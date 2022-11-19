import { ExtensionMessagingConfig } from '@webext-core/messaging';

export type Proimsify<T> = T extends Promise<any> ? T : Promise<T>;

export type Service = Record<string, any | ((...args: any[]) => any)>;

/**
 * Make all functions of a Service/interface async.
 */
export type AsyncService<TService> = {
  [fn in keyof TService]: TService[fn] extends (...args: any[]) => any
    ? (...args: Parameters<TService[fn]>) => Proimsify<ReturnType<TService[fn]>>
    : TService[fn];
};

export interface ProxyServiceConfig extends ExtensionMessagingConfig {}
