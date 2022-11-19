import { defineExtensionMessaging, ProtocolWithReturn } from '@webext-core/messaging';

interface MessageProtocol1 {
  ping: ProtocolWithReturn<undefined, 'pong'>;
  sleep: number;
}

export const { sendMessage: sendMessage1, onMessage: onMessage1 } =
  defineExtensionMessaging<MessageProtocol1>({ logger: console });

// Define another protocol to make sure the library supports multiple

interface MessageProtocol2 {
  ping2: ProtocolWithReturn<string, string>;
  throw: undefined;
}

export const { sendMessage: sendMessage2, onMessage: onMessage2 } =
  defineExtensionMessaging<MessageProtocol2>({ logger: console });
