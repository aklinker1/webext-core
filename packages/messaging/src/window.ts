import {uid} from 'uid'
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
export type WindowSendMessageArgs = [targetOrigin?: string];

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
 *
 * @link Spec diagrams
 * https://mermaid.live/edit#pako:eNqVlG9v2jAQxr-KZamvGv7YyYBYVSTGWgmpwAs6VZqQJpMc1BOxM8fZoIjvPieBACUVLC8SO3ru7vc4l9viUEWAGU7hdwYyhG-CLzWPZxLZa67WaKCkAWka01CLxDzMdSsobkKmhtsAUuy2SPIY0oSHwNBCKbQrMyRcGxGKhEuDbAT5qSTiKVJyBGnKl_CJKgUZ5br8eaa0-yPaUP6C0EDUeoX5VBi4hKP_A0dvgqM3wvWlMm-gi-Nb15ybe4k25_oTNPcmNPcKWrm8uzvWRF_Ld2NlAKk_oA_FnCodQ4PJaPR9PBz0X4aTMXp6nrwW6NP-6BH1p-j58enlkNsCoXKVX9WnbATB_f6AWcHWMpsE2AwnQi7JDNeFNNb7fmFILKXSlu-vLILP1HnOUkv3uCdqDemlOAgaVRWWS2phqjoXluipJVJriX6wRE8s0auWSGWJXLdEjpZovSV6ZqlcHjtBoVDFcSZFyG0LrIQ85D9rCfqhJcbnYUIWHRGJxQK0HRbHBrPJsINj0DEXkR0z2zz5DNs_I4YZZnYZwYJnK5ND7qyUZ0ZNNzLEzOgMHKxVtnzDbMFXqd1lSWTr7WdU9db2P2ZbvMasQYjX9AnteaRN3HbP7XgO3mBG3U6z533p-W637bue5-4c_K6UTUGbpOtT36edLvXaLu06GCJhlB6Vc7EYj0WJH4U-p9r9Aynbsqc
 */
export function defineWindowMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>,
>(config: WindowMessagingConfig): WindowMessenger<TProtocolMap> {
  const namespace = config.namespace;
  const instanceId = uid();

  let removeAdditionalListeners: Array<() => void> = [];

  const sendWindowMessage = (message: Message<TProtocolMap, any>, targetOrigin?: string) =>
    new Promise(res => {
      const responseListener = (event: MessageEvent) => {
        if (
          event.data.type === RESPONSE_TYPE &&
          event.data.namespace === namespace &&
          event.data.instanceId !== instanceId &&
          event.data.message.type === message.type
        ) {
          res(event.data.response);
          removeResponseListener();
        }
      };
      const removeResponseListener = () => window.removeEventListener('message', responseListener);
      removeAdditionalListeners.push(removeResponseListener);
      window.addEventListener('message', responseListener);
      window.postMessage(
        { type: REQUEST_TYPE, message, senderOrigin: location.origin, namespace, instanceId },
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
        if (
          event.data.type !== REQUEST_TYPE ||
          event.data.namespace !== namespace ||
          event.data.instanceId === instanceId
        )
          return;

        const response = await processMessage(event.data.message);
        window.postMessage(
          { type: RESPONSE_TYPE, response, instanceId, message: event.data.message, namespace },
          event.data.senderOrigin,
        );
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
