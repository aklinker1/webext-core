import browser from 'webextension-polyfill';
import { GenericMessenger, defineGenericMessanging } from './generic';
import { NamespaceMessagingConfig, Message } from './types';

const REQUEST_TYPE = '@webext-core/messaging/window';
const RESPONSE_TYPE = '@webext-core/messaging/window/response';

/**
 * Configuration passed into `defineWindowMessaging`.
 */
export interface WindowMessagingConfig extends NamespaceMessagingConfig {}

/**
 * For a `WindowMessenger`, `sendMessage` requires an additional argument, the `targetOrigin`. It
 * defines which frames inside the page should receive the message.
 *
 * > See <https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin> for more
 * details.
 */
export type WindowSendMessageArgs = [targetOrigin: string];

export type WindowMessenger<TProtocolMap extends Record<string, any>> = GenericMessenger<
  TProtocolMap,
  {},
  WindowSendMessageArgs
>;

/**
 * Returns a `WindowMessenger`. It is backed by the `window.postMessage` API.  It can be used to
 * communicate between:
 *
 * - Content script and website
 * - Content script and injected script
 *
 * @example
 * interface WebsiteMessengerSchema {
 *   initInjectedScript(data: ...): void;
 * }
 *
 * export const websiteMessenger = defineWindowMessaging<initInjectedScript>();
 *
 * // Content script
 * websiteMessenger.sendMessage("initInjectedScript", ...);
 *
 * // Injected script
 * websiteMessenger.onMessage("initInjectedScript", (...) => {
 *   // ...
 * })
 */
export function defineWindowMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>,
>(config?: WindowMessagingConfig): WindowMessenger<TProtocolMap> {
  const namespace = config?.namespace ?? browser.runtime.id;

  let removeAdditionalListeners: Array<() => void> = [];

  const sendWindowMessage = (message: Message<TProtocolMap, any>, targetOrigin?: string) =>
    new Promise(res => {
      const responseListener = (event: MessageEvent) => {
        if (event.data.type === RESPONSE_TYPE) {
          res(event.data.response);
          removeResponseListener();
        }
      };
      const removeResponseListener = () => window.removeEventListener('message', responseListener);
      removeAdditionalListeners.push(removeResponseListener);
      window.addEventListener('message', responseListener);
      window.postMessage(
        { type: REQUEST_TYPE, message, senderOrigin: location.origin, namespace },
        targetOrigin ?? '*',
      );
    });

  const messenger = defineGenericMessanging<TProtocolMap, {}, WindowSendMessageArgs>({
    ...config,

    sendMessage(message, targetOrigin) {
      return sendWindowMessage(message, targetOrigin);
    },

    addRootListener(processMessage) {
      const listener = async (event: MessageEvent) => {
        if (event.data.type !== REQUEST_TYPE || event.data.namespace !== namespace) return;

        const response = await processMessage(event.data.message);
        window.postMessage({ type: RESPONSE_TYPE, response }, event.data.senderOrigin);
      };

      window.addEventListener('message', listener);
      return () => window.removeEventListener('message', listener);
    },
  });

  return {
    ...messenger,
    removeAllListeners() {
      messenger.removeAllListeners();
      removeAdditionalListeners.forEach(removeListener => removeListener());
      removeAdditionalListeners = [];
    },
  };
}
