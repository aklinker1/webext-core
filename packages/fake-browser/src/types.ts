import { Browser } from '@wxt-dev/browser';

export interface EventForTesting<TParams extends any[], TReturn = void> {
  /** Trigger all listeners for an event and return all their responses. */
  trigger(...args: TParams): Promise<TReturn[]>;
  /** Remove all listeners for the event. */
  removeAllListeners(): void;
}

export type StorageChanges = {
  [key: string]: Browser.storage.StorageChange;
};

export type DeepPartial<T> =
  T extends Record<string, any>
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
