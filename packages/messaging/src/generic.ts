import { GetDataType, GetReturnType, Logger, MaybePromise } from '.';

export interface Message<TType = string> {
  id: number;
  type: TType;
  data: any;
  timestamp: number;
}

type RemoveListenerCallback = () => void;

export interface GenericMessagingConfig<TMessage, TSendMessageArgs extends any[]> {
  logger?: Logger;
  sendMessage(message: Message, ...args: TSendMessageArgs): Promise<any>;
  addRootListener(
    processMessage: (message: TMessage) => void | Promise<{ res: any } | { err: unknown }>,
  ): RemoveListenerCallback;
}

export interface GenericMessenger<TProtocolMap, TSendMessageArgs extends any[]> {
  sendMessage<TType extends keyof TProtocolMap>(
    type: TType,
    data: GetDataType<TProtocolMap[TType]>,
    ...args: TSendMessageArgs
  ): Promise<GetReturnType<TProtocolMap[TType]>>;

  onMessage<TType extends keyof TProtocolMap, TMessage extends Message<TType>>(
    type: TType,
    onReceived: (message: TMessage) => void | MaybePromise<GetReturnType<TProtocolMap[TType]>>,
  ): RemoveListenerCallback;

  removeAllListeners(): void;
}

export function defineGenericMessanging<
  TProtocolMap = Record<string, any>,
  TMessage extends Message<keyof TProtocolMap> = Message<keyof TProtocolMap>,
  TSendMessageArgs extends any[] = [],
>(
  config: GenericMessagingConfig<TMessage, TSendMessageArgs>,
): GenericMessenger<TProtocolMap, TSendMessageArgs> {
  let removeRootListener: RemoveListenerCallback | undefined;
  let perTypeListeners: {
    [t in keyof TProtocolMap]+?: (message: TMessage) => void | Promise<any>;
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
    async sendMessage(type, data, ...args): Promise<any> {
      const message: Message = {
        id: getNextId(),
        type: type as string,
        data,
        timestamp: Date.now(),
      };
      config.logger?.debug(`[messaging] sendMessage {id=${message.id}} ─ᐅ`, message);

      const response = await config.sendMessage(message, ...args);
      const { res, err } = response ?? { err: 'No response' };
      config.logger?.debug(`[messaging] sendMessage {id=${message.id}} ᐊ─`, { res, err });

      if (err != null) throw Error(err);
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
              let errMessage: string;
              if (err instanceof Error) errMessage = err.message;
              else errMessage = String(err);
              config?.logger?.debug(`[messaging] onMessage {id=${message.id}} ─ᐅ`, { err });
              return { err: errMessage };
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
