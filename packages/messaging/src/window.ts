import { GenericMessenger, defineGenericMessanging } from './generic';
import { BaseMessagingConfig, Message } from './types';

const REQUEST_TYPE = '@webext-core/messaging/window';
const RESPONSE_TYPE = '@webext-core/messaging/window/response';

/**
 * Configuration passed into `defineWindowMessaging`.
 */
export interface WindowMessagingConfig extends BaseMessagingConfig {}

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
  const sendWindowMessage = (message: Message<TProtocolMap, any>) =>
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

  return defineGenericMessanging({
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
