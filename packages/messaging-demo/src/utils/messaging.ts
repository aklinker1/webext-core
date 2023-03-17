import { defineExtensionMessaging } from '@webext-core/messaging';

interface MessageProtocol1 {
  ping(): 'pong';
  ping2(message: string): string;
  sleep(ms: number): void;
  throw(): void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<MessageProtocol1>({
  logger: console,
});
