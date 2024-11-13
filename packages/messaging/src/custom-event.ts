import { uid } from 'uid';
import { GenericMessenger, defineGenericMessanging } from './generic';
import { NamespaceMessagingConfig } from './types';
import { prepareCustomEventDict } from './utils';

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
 *
 * * @link Spec diagrams
 * https://mermaid.live/edit#pako:eNqVlG9v2jAQxr-KZamvGv7YyYBYVSTGWgmpwAs6VZqQJpMc1BOxM8fZoIjvPieBACUVLC8SO3ru7vc4l9viUEWAGU7hdwYyhG-CLzWPZxLZa67WaKCkAWka01CLxDzMdSsobkKmhtsAUuy2SPIY0oSHwNBCKbQrMyRcGxGKhEuDbAT5qSTiKVJyBGnKl_CJKgUZ5br8eaa0-yPaUP6C0EDUeoX5VBi4hKP_A0dvgqM3wvWlMm-gi-Nb15ybe4k25_oTNPcmNPcKWrm8uzvWRF_Ld2NlAKk_oA_FnCodQ4PJaPR9PBz0X4aTMXp6nrwW6NP-6BH1p-j58enlkNsCoXKVX9WnbATB_f6AWcHWMpsE2AwnQi7JDNeFNNb7fmFILKXSlu-vLILP1HnOUkv3uCdqDemlOAgaVRWWS2phqjoXluipJVJriX6wRE8s0auWSGWJXLdEjpZovSV6ZqlcHjtBoVDFcSZFyG0LrIQ85D9rCfqhJcbnYUIWHRGJxQK0HRbHBrPJsINj0DEXkR0z2zz5DNs_I4YZZnYZwYJnK5ND7qyUZ0ZNNzLEzOgMHKxVtnzDbMFXqd1lSWTr7WdU9db2P2ZbvMasQYjX9AnteaRN3HbP7XgO3mBG3U6z533p-W637bue5-4c_K6UTUGbpOtT36edLvXaLu06GCJhlB6Vc7EYj0WJH4U-p9r9Aynbsqc
 */
export function defineCustomEventMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>,
>(config: CustomEventMessagingConfig): CustomEventMessenger<TProtocolMap> {
  const namespace = config.namespace;
  const instanceId = uid();

  const removeAdditionalListeners: Array<() => void> = [];

  const sendCustomMessage = (requestEvent: CustomEvent) =>
    new Promise(res => {
      const responseListener = (e: Event) => {
        const { detail } = e as CustomEvent;
        if (
          detail.namespace === namespace &&
          detail.instanceId !== instanceId &&
          detail.message.type === requestEvent.detail.message.type
        ) {
          res(detail.response);
        }
      };
      removeAdditionalListeners.push(() =>
        window.removeEventListener(RESPONSE_EVENT, responseListener),
      );
      window.addEventListener(RESPONSE_EVENT, responseListener);
      window.dispatchEvent(requestEvent);
    });

  const messenger = defineGenericMessanging<TProtocolMap, CustomEventMessage, []>({
    ...config,

    sendMessage(message) {
      const reqDetail = { message, namespace, instanceId };
      const requestEvent = new CustomEvent(REQUEST_EVENT, {
        detail: prepareCustomEventDict(reqDetail),
      });
      return sendCustomMessage(requestEvent);
    },

    addRootListener(processMessage) {
      const requestListener = async (e: Event) => {
        const { detail, ...event } = e as CustomEvent;
        if (detail.namespace !== namespace || detail.instanceId === instanceId) return;

        const message = { ...detail.message, event };
        const response = await processMessage(message);

        const resDetail = { response, message, instanceId, namespace };
        const responseEvent = new CustomEvent(RESPONSE_EVENT, {
          detail: prepareCustomEventDict(resDetail),
        });
        window.dispatchEvent(responseEvent);
      };

      window.addEventListener(REQUEST_EVENT, requestListener);
      return () => window.removeEventListener(REQUEST_EVENT, requestListener);
    },
    verifyMessageData(data) {
      return structuredClone(data);
    },
  });

  return {
    ...messenger,
    removeAllListeners() {
      messenger.removeAllListeners();
      removeAdditionalListeners.forEach(removeListener => removeListener());
    },
  };
}
