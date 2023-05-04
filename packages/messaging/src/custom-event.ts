import { GenericMessagingConfig, Message, defineGenericMessanging } from './generic';

const REQUEST_EVENT = '@webext-core/messaging/custom-events';
const RESPONSE_EVENT = '@webext-core/messaging/custom-events/response';

export interface CustomEventMessagingConfig<TMessage>
  extends Pick<GenericMessagingConfig<TMessage, []>, 'logger'> {}

export type CustomEventWithMessage<TType> = Omit<CustomEvent<Message<TType>>, 'detail'>;

export interface CustomEventMessage<TType = string> extends Message<TType> {
  event: Omit<CustomEvent<Message<TType>>, 'detail'>;
}

export function defineCustomEventMessaging<TProtocolMap = Record<string, any>>(
  config?: CustomEventMessagingConfig<CustomEventMessage>,
) {
  const sendCustomMessage = (event: CustomEvent) =>
    new Promise(res => {
      const responseListener = (e: Event) => {
        const { detail } = e as CustomEvent;
        res(detail);
        window.removeEventListener(RESPONSE_EVENT, responseListener);
      };
      window.addEventListener(RESPONSE_EVENT, responseListener);
      window.dispatchEvent(event);
    });

  return defineGenericMessanging<TProtocolMap, CustomEventMessage<keyof TProtocolMap>, []>({
    ...config,

    sendMessage(message) {
      const event = new CustomEvent(REQUEST_EVENT, { detail: message });
      return sendCustomMessage(event);
    },

    addRootListener(processMessage) {
      const listener = (e: Event) => {
        const { detail, ...event } = e as CustomEvent;
        const response = processMessage({ ...detail, event });

        const responseEvent = new CustomEvent(RESPONSE_EVENT, { detail: response });
        window.dispatchEvent(responseEvent);
      };

      window.addEventListener(REQUEST_EVENT, listener);
      return () => window.removeEventListener(REQUEST_EVENT, listener);
    },
  });
}
