import Browser, { Runtime } from 'webextension-polyfill';
import { GenericMessenger, defineGenericMessanging } from './generic';
import { BaseMessagingConfig } from './types';

/**
 * Configuration passed into `defineExtensionMessaging`.
 */
export interface ExtensionMessagingConfig extends BaseMessagingConfig { }

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
 * Options for sending a message to a specific tab/frame
 */
export interface SendMessageOptions {
  /**
   * The tab to send a message to
   */
  tabId: number;
  /**
   * The frame to send a message to. 0 represents the main frame.
   */
  frameId?: number;
}

/**
 * Send message accepts either:
 * - No arguments to send to background
 * - A tabId number to send to a specific tab
 * - A SendMessageOptions object to target a specific tab and/or frame
 */
export type ExtensionSendMessageArgs = [arg?: number | SendMessageOptions];

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
    sendMessage(message, arg) {
      // No args - send to background
      if (arg == null) {
        return Browser.runtime.sendMessage(message);
      }

      // Handle both number and options object
      const options: SendMessageOptions = typeof arg === 'number' ? { tabId: arg } : arg;

      if (typeof options.tabId !== 'number') {
        throw new Error('tabId is required when sending a message to a tab');
      }

      return Browser.tabs.sendMessage(
        options.tabId,
        message,
        // Pass frameId if specified
        options.frameId != null ? { frameId: options.frameId } : undefined,
      );
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
