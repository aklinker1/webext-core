import Browser, { Runtime } from 'webextension-polyfill';
import { GenericMessagingConfig, Message, defineGenericMessanging } from './generic';
import { RemoveListenerCallback } from '.';

export interface ExtensionMessagingConfig<TMessage>
  extends Pick<GenericMessagingConfig<TMessage, ExtensionSendMessageArgs>, 'logger'> {}

export interface ExtensionMessage<TType = string> extends Message<TType> {
  sender: Runtime.MessageSender;
}

export type ExtensionSendMessageArgs = [tabId?: number];

export function defineExtensionMessaging<TProtocolMap = Record<string, any>>(
  config?: ExtensionMessagingConfig<ExtensionMessage>,
) {
  return defineGenericMessanging<
    TProtocolMap,
    ExtensionMessage<keyof TProtocolMap>,
    ExtensionSendMessageArgs
  >({
    ...config,
    sendMessage(message, tabId) {
      if (tabId == null) return Browser.runtime.sendMessage(message);
      return Browser.tabs.sendMessage(tabId, message);
    },
    addRootListener(processMessage) {
      const listener = (
        message: ExtensionMessage<keyof TProtocolMap>,
        sender: Runtime.MessageSender,
      ) => {
        if (typeof message === 'object') return processMessage({ ...message, sender });
        else return processMessage(message);
      };

      Browser.runtime.onMessage.addListener(listener);
      return () => Browser.runtime.onMessage.removeListener(listener);
    },
  });
}
