import {
  RemoveListenerCallback,
  GetDataType,
  GetReturnType,
  MaybePromise,
  BaseMessagingConfig,
  Message,
} from './types';
import { serializeError, deserializeError } from 'serialize-error';

/**
 * Config required to call `defineGenericMessenger`.
 */
interface GenericMessagingConfig<
  TProtocolMap extends Record<string, any>,
  TMessageExtension,
  TSendMessageArgs extends any[],
> extends BaseMessagingConfig {
  sendMessage<TType extends keyof TProtocolMap>(
    message: Message<TProtocolMap, TType>,
    ...args: TSendMessageArgs
  ): Promise<any>;
  addRootListener(
    processMessage: (
      message: Message<TProtocolMap, any> & TMessageExtension,
    ) => void | Promise<{ res: any } | { err: unknown }>,
  ): RemoveListenerCallback;
}

/**
 * Messaging interface shared by all messengers.
 *
 * Type parameters accept:
 * - `TProtocolMap` to define the data and return types of messages.
 * - `TMessageExtension` to define additional fields that are available on a message inside
 *    `onMessage`'s callback
 * - `TSendMessageArgs` to define a list of additional arguments for `sendMessage`
 */
export interface GenericMessenger<
  TProtocolMap extends Record<string, any>,
  TMessageExtension,
  TSendMessageArgs extends any[],
> {
  /**
   * Send a message to the background or a specific tab if `tabId` is passed. You can call this
   * function anywhere in your extension.
   *
   * If you haven't setup a listener for the sent `type`, an error will be thrown.
   *
   * @param type The message type being sent. Call `onMessage` with the same type to listen for that message.
   * @param data The data to send with the message.
   * @param args Different messengers will have additional arguments to configure how a message gets sent.
   */
  sendMessage<TType extends keyof TProtocolMap>(
    type: TType,
    data: GetDataType<TProtocolMap[TType]>,
    ...args: TSendMessageArgs
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
    onReceived: (
      message: Message<TProtocolMap, TType> & TMessageExtension,
    ) => void | MaybePromise<GetReturnType<TProtocolMap[TType]>>,
  ): RemoveListenerCallback;

  /**
   * Removes all listeners.
   */
  removeAllListeners(): void;
}

export function defineGenericMessanging<
  TProtocolMap extends Record<string, any>,
  TMessageExtension,
  TSendMessageArgs extends any[] = [],
>(
  config: GenericMessagingConfig<TProtocolMap, TMessageExtension, TSendMessageArgs>,
): GenericMessenger<TProtocolMap, TMessageExtension, TSendMessageArgs> {
  let removeRootListener: RemoveListenerCallback | undefined;
  let perTypeListeners: {
    [t in keyof TProtocolMap]+?: (message: TMessageExtension) => void | Promise<any>;
  } = {};

  function cleanupRootListener() {
    if (Object.entries(perTypeListeners).length === 0) {
      removeRootListener?.();
      removeRootListener = undefined;
    }
  }

  let idSeq = Math.floor(Math.random() * 10000);
  function getNextId(): number {
    return idSeq++;
  }

  return {
    async sendMessage<TType extends keyof TProtocolMap>(
      type: TType,
      data: TProtocolMap[TType],
      ...args: TSendMessageArgs
    ): Promise<any> {
      const message: Message<TProtocolMap, TType> = {
        id: getNextId(),
        type: type,
        data,
        timestamp: Date.now(),
      };
      config.logger?.debug(`[messaging] sendMessage {id=${message.id}} ─ᐅ`, message, ...args);

      const response = await config.sendMessage(message, ...args);
      const { res, err } = response ?? { err: serializeError(new Error('No response')) };
      config.logger?.debug(`[messaging] sendMessage {id=${message.id}} ᐊ─`, { res, err });

      if (err != null) throw deserializeError(err);
      return res;
    },

    onMessage(type, onReceived) {
      // Setup single, root listener (if it doesn't exist) that processes the message
      if (removeRootListener == null) {
        config.logger?.debug(
          `[messaging] ${type as string} initialized message listener for this context`,
        );
        removeRootListener = config.addRootListener(message => {
          // Validate the message object
          if (typeof message.type != 'string' || typeof message.timestamp !== 'number') {
            const err = Error(
              `[messaging] Unknown message format, must include the 'type' & 'timestamp' fields, received: ${JSON.stringify(
                message,
              )}`,
            );
            config.logger?.error(err);
            throw err;
          }

          // Execute the type's listener
          config?.logger?.debug('[messaging] Received message', message);
          const listener = perTypeListeners[message.type];
          if (listener == null) return;

          const res = listener(message);
          return Promise.resolve(res)
            .then(res => {
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ─ᐅ`, { res });
              return { res };
            })
            .catch(err => {
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ─ᐅ`, { err });
              return { err: serializeError(err) };
            });
        });
      }

      // Ensure only one listener for a message type can be added
      if (perTypeListeners[type] != null) {
        const err = Error(
          `[messaging] In this JS context, only one listener can be setup for ${type as string}`,
        );
        config.logger?.error(err);
        throw err;
      }

      // Add the listener
      // @ts-expect-error
      perTypeListeners[type] = onReceived;
      config.logger?.log(`[messaging] Added listener for ${type as string}`);

      // Return function that removes the listener and optionally removes the root listener
      return () => {
        delete perTypeListeners[type];
        cleanupRootListener();
      };
    },

    removeAllListeners() {
      Object.keys(perTypeListeners).forEach(type => {
        delete perTypeListeners[type as keyof TProtocolMap];
      });
      cleanupRootListener();
    },
  };
}
