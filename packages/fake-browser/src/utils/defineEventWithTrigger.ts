import { Events } from 'webextension-polyfill';

type EventCallback = (...args: any[]) => any;

type EventWithTrigger<TCallback extends EventCallback> = Events.Event<TCallback> & {
  /**
   * Manually trigger the event and return the results from all the active listeners.
   */
  trigger(...args: Parameters<TCallback>): Promise<ReturnType<TCallback>[]>;
  /**
   * Remove all listeners from the event.
   */
  removeAllListeners(): void;
};

export function defineEventWithTrigger<T extends EventCallback>(): EventWithTrigger<T> {
  const listeners: T[] = [];

  return {
    hasListener(callback) {
      return listeners.includes(callback);
    },
    hasListeners() {
      return listeners.length > 0;
    },
    addListener(callback) {
      listeners.push(callback);
    },
    removeListener(callback) {
      const index = listeners.indexOf(callback);
      if (index >= 0) listeners.splice(index, 1);
    },
    removeAllListeners() {
      listeners.length = 0;
    },
    async trigger(...args) {
      return await Promise.all(listeners.map(l => l(...args)));
    },
  };
}
