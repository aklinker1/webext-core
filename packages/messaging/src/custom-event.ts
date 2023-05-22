import browser from 'webextension-polyfill';
import { GenericMessenger, defineGenericMessanging } from './generic';
import { NamespaceMessagingConfig } from './types';

const REQUEST_EVENT = '@webext-core/messaging/custom-events';
const RESPONSE_EVENT = '@webext-core/messaging/custom-events/response';

/**
 * Configuration passed into `defineCustomEventMessaging`.
 */
export interface CustomEventMessagingConfig extends NamespaceMessagingConfig {}

/**
 * Additional fields available on the `Message` from a `CustomEventMessenger`.
 */
export interface CustomEventMessage {
  /**
   * The event that was fired, resulting in the message being passed.
   */
  event: CustomEvent;
}

/**
 * Messenger returned by `defineCustomEventMessenger`.
 */
export type CustomEventMessenger<TProtocolMap extends Record<string, any>> = GenericMessenger<
  TProtocolMap,
  CustomEventMessage,
  []
>;

/**
 * Creates a `CustomEventMessenger`. This messenger is backed by the `CustomEvent` APIs. It can be
 * used to communicate between:
 *
 * - Content script and website
 * - Content script and injected script
 *
 * `sendMessage` does not accept any additional arguments..
 *
 * @example
 * interface WebsiteMessengerSchema {
 *   initInjectedScript(data: ...): void;
 * }
 *
 * export const websiteMessenger = defineCustomEventMessenger<initInjectedScript>();
 *
 * // Content script
 * websiteMessenger.sendMessage("initInjectedScript", ...);
 *
 * // Injected script
 * websiteMessenger.onMessage("initInjectedScript", (...) => {
 *   // ...
 * })
 */
export function defineCustomEventMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>,
>(config?: CustomEventMessagingConfig): CustomEventMessenger<TProtocolMap> {
  const messengerId = Math.random();
  const namespace = config?.namespace ?? browser.runtime.id;

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

  return defineGenericMessanging({
    ...config,

    sendMessage(message) {
      const event = new CustomEvent(REQUEST_EVENT, { detail: { message, messengerId, namespace } });
      return sendCustomMessage(event);
    },

    addRootListener(processMessage) {
      const listener = async (e: Event) => {
        const { detail, ...event } = e as CustomEvent;
        if (detail.messengerId === messengerId || detail.namespace !== namespace) return;

        const message = { ...detail.message, event };
        const response = await processMessage(message);

        const responseEvent = new CustomEvent(RESPONSE_EVENT, { detail: response });
        window.dispatchEvent(responseEvent);
      };

      window.addEventListener(REQUEST_EVENT, listener);
      return () => window.removeEventListener(REQUEST_EVENT, listener);
    },
  });
}
