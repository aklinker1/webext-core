import Browser, { Runtime } from 'webextension-polyfill';
import { GenericMessenger, defineGenericMessanging } from './generic';
import { BaseMessagingConfig } from './types';

/**
 * Configuration passed into `defineExtensionMessaging`.
 */
export interface ExtensionMessagingConfig extends BaseMessagingConfig {}

/**
 * Additional fields available on the `Message` from an `ExtensionMessenger`.
 */
export interface ExtensionMessage {
  /**
   * Information about where the message came from. See
   * [`Runtime.MessageSender`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/MessageSender).
   */
  sender: Runtime.MessageSender;
}

/**
 * Send messsage accepts an additional, optional argument `tabId`. Pass it to send a message to a
 * specific tab from the background script.
 *
 * You cannot message between tabs directly. It must go through the background script.
 */
export type ExtensionSendMessageArgs = [
  /**
   * The tab to send a message to.
   */
  tabId?: number,
];

/**
 * Messenger returned by `defineExtensionMessaging`.
 */
export type ExtensionMessenger<TProtocolMap extends Record<string, any>> = GenericMessenger<
  TProtocolMap,
  ExtensionMessage,
  ExtensionSendMessageArgs
>;

/**
 * Returns an `ExtensionMessenger` that is backed by the `browser.runtime.sendMessage` and
 * `browser.tabs.sendMessage` APIs.
 *
 * It can be used to send messages to and from the background page/service worker.
 */
export function defineExtensionMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>,
>(config?: ExtensionMessagingConfig): ExtensionMessenger<TProtocolMap> {
  return defineGenericMessanging({
    ...config,
    sendMessage(message, tabId) {
      if (tabId == null) return Browser.runtime.sendMessage(message);
      return Browser.tabs.sendMessage(tabId, message);
    },
    addRootListener(processMessage) {
      const listener = (message: any, sender: Runtime.MessageSender) => {
        if (typeof message === 'object') return processMessage({ ...message, sender });
        else return processMessage(message);
      };

      Browser.runtime.onMessage.addListener(listener);
      return () => Browser.runtime.onMessage.removeListener(listener);
    },
  });
}
