export type Proimsify<T> = T extends Promise<any> ? T : Promise<T>;

export type Service = ((...args: any[]) => Promise<any>) | { [key: string]: any | Service };

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
