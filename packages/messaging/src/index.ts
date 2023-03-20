import Browser, { Runtime } from 'webextension-polyfill';

/**
 * Interface used to log text to the console when sending and recieving messages.
 */
export interface Logger {
  debug(...args: any[]): void;
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export interface ExtensionMessagingConfig {
  /**
   * The logger to use when logging messages. Defaults to `console`.
   *
   * Set to `null` to disable logging.
   */
  logger?: Logger;
}

/**
 * Used to add a return type to a message in the protocol map.
 *
 * @example
 * interface ProtocolMap {
 *   // data is a string, returns undefined
 *   type1: string;
 *   // data is a string, returns a number
 *   type2: ProtocolWithReturn<string, number>;
 * }
 *
 * > Internally, this is just an object with random keys for the data and return types.
 */
export type ProtocolWithReturn<TData, TReturn> = { BtVgCTPYZu: TData; RrhVseLgZW: TReturn };

/**
 * Given a function declaration, `ProtocolWithReturn`, or a value, return the message's data type.
 */
export type GetDataType<T> = T extends (...args: infer Args) => any
  ? Args['length'] extends 0 | 1
    ? Args[0]
    : never
  : T extends ProtocolWithReturn<any, any>
  ? T['BtVgCTPYZu']
  : T;

/**
 * Given a function declaration, `ProtocolWithReturn`, or a value, return the message's return type.
 */
export type GetReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : T extends ProtocolWithReturn<any, any>
  ? T['RrhVseLgZW']
  : void;

/**
 * Either a Promise of a type, or that type directly. Used to indicate that a method can by sync or
 * async.
 */
export type MaybePromise<T> = Promise<T> | T;

/**
 * Call to ensure an active listener has been removed.
 *
 * If the listener has already been removed with `Messenger.removeAllListeners`, this is a noop.
 */
export type RemoveListenerCallback = () => void;
type OnMessageReceived<TProtocolMap, TType extends keyof TProtocolMap> = (
  message: Message<TProtocolMap, TType>,
) => MaybePromise<GetReturnType<TProtocolMap[TType]>>;

/**
 * Use the functions defined in the messenger to send and recieve messages throughout your entire extension.
 *
 * Unlike the regular `chrome.runtime` messaging APIs, there are no limitations to when you call `onMessage` or `sendMessage`.
 */
export interface Messenger<TProtocolMap> {
  /**
   * Send a message to the background or a specific tab if `tabId` is passed. You can call this
   * function anywhere in your extension.
   *
   * If you haven't setup a listener for the sent `type`, an error will be thrown.
   *
   * @param type The message type being sent. Call `onMessage` with the same type to listen for that message.
   * @param data The data to send with the message.
   * @param tabId An optional ID specifying which tab the message should be sent to.
   */
  sendMessage<TType extends keyof TProtocolMap>(
    type: TType,
    data: GetDataType<TProtocolMap[TType]>,
    tabId?: number,
  ): Promise<GetReturnType<TProtocolMap[TType]>>;

  /**
   * Trigger a callback when a message of the requested type is recieved. You cannot setup multiple
   * listeners for the same message type in the same JS context.
   *
   * To remove the listener, call the returned message.
   *
   * @param type The message type to listen for. Call `sendMessage` with the same type to triggern this listener.
   * @param onReceived The callback executed when a message is recieved.
   */
  onMessage<TType extends keyof TProtocolMap>(
    type: TType,
    onReceived: OnMessageReceived<TProtocolMap, TType>,
  ): RemoveListenerCallback;

  /**
   * Removes all listeners.
   */
  removeAllMessageListeners(): void;
}

/**
 * Contains information about the message recieved.
 */
interface Message<TProtocolMap, TType extends keyof TProtocolMap> {
  /**
   * A semi-unique, auto-incrementing number used to trace messages being sent.
   */
  id: number;
  /**
   * The data that was passed into `sendMessage`
   */
  data: GetDataType<TProtocolMap[TType]>;
  /**
   * See [`MessageSender`](https://developer.chrome.com/docs/extensions/reference/runtime/#type-MessageSender).
   * This contains information about which JS context sent the message.
   */
  sender: Runtime.MessageSender;
  /**
   * The timestamp the message was sent in MS since epoch.
   */
  timestamp: number;
}

/**
 * Creates a new `Messenger` used to send and recieve messages in your extension.
 *
 * @param config Configure the behavior of the messenger.
 */
export function defineExtensionMessaging<
  TProtocolMap = Record<string, ProtocolWithReturn<any, any>>,
>(config?: ExtensionMessagingConfig): Messenger<TProtocolMap> {
  let rootListener:
    | undefined
    | ((message: any, sender: Browser.Runtime.MessageSender) => void | Promise<any>);
  function cleanupRootListener() {
    if (Object.entries(keyListeners).length === 0) {
      // @ts-expect-error: rootListener's type is not what is expected
      Browser.runtime.onMessage.removeListener(rootListener);
      rootListener = undefined;
    }
  }

  let keyListeners: { [type in keyof TProtocolMap]?: Function } = {};

  let idSeq = Math.floor(Math.random() * 10000);
  function getNextId(): number {
    return idSeq++;
  }

  function onMessage<TType extends keyof TProtocolMap>(
    type: TType,
    onReceived: OnMessageReceived<TProtocolMap, TType>,
  ) {
    if (rootListener == null) {
      config?.logger?.debug(
        `[messaging] ${type as string} initialized message listener for this context`,
      );
      rootListener = (message, sender) => {
        if (typeof message.type != 'string' || typeof message.timestamp !== 'number') {
          const err = Error(
            `[messaging] Unknown message format, must include the 'type' & 'timestamp' fields, received: ${JSON.stringify(
              message,
            )}`,
          );
          config?.logger?.error(err);
          throw err;
        }

        config?.logger?.debug('[messaging] Received message', message, sender);
        const entries = Object.entries(keyListeners) as Array<[keyof TProtocolMap, Function]>;
        for (const [type, listener] of entries) {
          if (message.type !== type) continue;
          config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ᐊ─`, message);

          const res = listener({
            data: message.data,
            sender: sender,
            timestamp: message.timestamp,
          });
          // Return a promise if we find a listener
          return Promise.resolve(res)
            .then(res => {
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ─ᐅ`, { res });
              return { res };
            })
            .catch(err => {
              let errMessage: string;
              if (err instanceof Error) errMessage = err.message;
              else errMessage = String(err);
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ─ᐅ`, { err });
              return { err: errMessage };
            });
        }
      };
      Browser.runtime.onMessage.addListener(rootListener);
    }

    if (keyListeners[type] != null) {
      const err = Error(
        `[messaging] In this JS context, only one listener can be setup for ${type as string}`,
      );
      config?.logger?.error(err);
      throw err;
    }
    keyListeners[type] = onReceived;
    config?.logger?.log(`[messaging] Added listener for ${type as string}`);

    return function removeListener(): void {
      delete keyListeners[type];
      cleanupRootListener();
    };
  }

  async function sendMessage<TType extends keyof TProtocolMap>(
    type: TType,
    data: GetDataType<TProtocolMap[TType]>,
    tabId?: number,
  ): Promise<GetReturnType<TProtocolMap[TType]>> {
    const message = { id: getNextId(), type, data, timestamp: Date.now() };
    config?.logger?.debug(`[messaging] sendMessage {id=${message.id}} ─ᐅ`, message);

    let response;
    if (tabId == null) response = await Browser.runtime.sendMessage(message);
    else response = await Browser.tabs.sendMessage(tabId, message);

    const { res, err } = response ?? { err: 'No response' };
    config?.logger?.debug(`[messaging] sendMessage {id=${message.id}} ᐊ─`, { res, err });
    if (err != null) throw Error(err);
    return res;
  }

  function removeAllMessageListeners() {
    Object.keys(keyListeners).forEach(type => {
      // @ts-expect-error: type is of type string, not `keyof TProtocolMap`
      delete keyListeners[type];
    });
    cleanupRootListener();
  }

  return { onMessage, sendMessage, removeAllMessageListeners };
}
