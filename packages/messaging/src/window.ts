import { GenericMessagingConfig, Message, defineGenericMessanging } from './generic';

const REQUEST_TYPE = '@webext-core/messaging/window';
const RESPONSE_TYPE = '@webext-core/messaging/window/response';

export interface WindowMessagingConfig<TMessage>
  extends Pick<GenericMessagingConfig<TMessage, WindowSendMessageArgs>, 'logger'> {}

export interface WindowMessage<TType = string> extends Message<TType> {}

export type WindowSendMessageArgs = [target: string];

export function defineWindowMessaging<TProtocolMap = Record<string, any>>(
  config?: WindowMessagingConfig<WindowMessage>,
) {
  const sendWindowMessage = (message: Message) =>
    new Promise(res => {
      const responseListener = (event: MessageEvent) => {
        if (event.data.type === RESPONSE_TYPE) {
          res(event.data.response);
          window.removeEventListener('message', responseListener);
        }
      };
      window.addEventListener('message', responseListener);
      window.postMessage({
        type: REQUEST_TYPE,
        message,
      });
    });

  return defineGenericMessanging<
    TProtocolMap,
    WindowMessage<keyof TProtocolMap>,
    WindowSendMessageArgs
  >({
    ...config,

    sendMessage(message) {
      return sendWindowMessage(message);
    },

    addRootListener(processMessage) {
      const listener = (event: MessageEvent) => {
        if (event.data.type === REQUEST_TYPE) {
          return processMessage(event.data.message);
        }
      };

      window.addEventListener('message', listener);
      return () => window.removeEventListener('message', listener);
    },
  });
}
