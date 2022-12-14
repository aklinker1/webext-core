import Browser, { Runtime } from 'webextension-polyfill';

export interface ExtensionMessagingConfig {
  logger?: {
    debug(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
  };
}

// Use randomized keys so they don't conflict with payload-only types
export type ProtocolWithReturn<TData, TResponse> = { BtVgCTPYZu: TData; RrhVseLgZW: TResponse };

type GetData<T> = T extends ProtocolWithReturn<any, any> ? T['BtVgCTPYZu'] : T;
type GetResponse<T> = T extends ProtocolWithReturn<any, any> ? T['RrhVseLgZW'] : void;

interface Message<TProtocolMap, TKey extends keyof TProtocolMap> {
  id: number;
  data: GetData<TProtocolMap[TKey]>;
  sender: Runtime.MessageSender;
  timestamp: number;
}

type MaybePromise<T> = Promise<T> | T;

type OnMessageReceived<TProtocolMap, TKey extends keyof TProtocolMap> = (
  message: Message<TProtocolMap, TKey>,
) => MaybePromise<GetResponse<TProtocolMap[TKey]>>;

export function defineExtensionMessaging<TProtocolMap>(config?: ExtensionMessagingConfig) {
  let rootListener:
    | undefined
    | ((message: any, sender: Browser.Runtime.MessageSender) => void | Promise<any>);
  let keyListeners: { [key in keyof TProtocolMap]?: Function } = {};

  let idSeq = Math.floor(Math.random() * 10000);
  function getNextId(): number {
    return idSeq++;
  }

  function onMessage<TKey extends keyof TProtocolMap>(
    key: TKey,
    onReceived: OnMessageReceived<TProtocolMap, TKey>,
  ) {
    if (rootListener == null) {
      config?.logger?.debug(
        `[messaging] ${key as string} initialized message listener for this context`,
      );
      rootListener = (message, sender) => {
        if (typeof message.key != 'string' || typeof message.timestamp !== 'number') {
          const err = Error(
            `[messaging] Unknown message format, must include the 'key' & 'timestamp' fields, received: ${JSON.stringify(
              message,
            )}`,
          );
          config?.logger?.error(err);
          throw err;
        }

        config?.logger?.debug('[messaging] Received message', message, sender);
        const entries = Object.entries(keyListeners) as Array<[keyof TProtocolMap, Function]>;
        for (const [key, listener] of entries) {
          if (message.key !== key) continue;
          config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ??????`, message);

          const res = listener({
            data: message.data,
            sender: sender,
            timestamp: message.timestamp,
          });
          // Return a promise if we find a listener
          return Promise.resolve(res)
            .then(res => {
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ??????`, { res });
              return { res };
            })
            .catch(err => {
              let errMessage: string;
              if (err instanceof Error) errMessage = err.message;
              else errMessage = String(err);
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ??????`, { err });
              return { err: errMessage };
            });
        }

        return Promise.resolve({
          err: `Listener not found for message.type="${message.key}".\n\nDid you forget to call \`onMessage("getLength", ...)\`?`,
        });
      };
      Browser.runtime.onMessage.addListener(rootListener);
    }

    if (keyListeners[key] != null) {
      const err = Error(
        `[messaging] In this JS context, only one listener can be setup for ${key as string}`,
      );
      config?.logger?.error(err);
      throw err;
    }
    keyListeners[key] = onReceived;
    config?.logger?.log(`[messaging] Added listener for ${key as string}`);

    return function removeListener(): void {
      delete keyListeners[key];
      if (Object.entries(keyListeners).length === 0) {
        // @ts-expect-error: rootListener's type is not what is expected
        Browser.runtime.onMessage.removeListener(rootListener);
        rootListener = undefined;
      }
    };
  }

  async function sendMessage<TKey extends keyof TProtocolMap>(
    key: TKey,
    data: GetData<TProtocolMap[TKey]>,
    tabId?: number,
  ): Promise<GetResponse<TProtocolMap[TKey]>> {
    const message = { id: getNextId(), key, data, timestamp: Date.now() };
    config?.logger?.debug(`[messaging] sendMessage {id=${message.id}} ??????`, message);

    let response;
    if (tabId == null) response = await Browser.runtime.sendMessage(message);
    else response = await Browser.tabs.sendMessage(tabId, message);

    const { res, err } = response ?? { err: 'No response' };
    config?.logger?.debug(`[messaging] sendMessage {id=${message.id}} ??????`, { res, err });
    if (err != null) throw Error(err);
    return res;
  }

  return { onMessage, sendMessage };
}
