import { defineWindowMessaging } from '@webext-core/messaging/page';

export interface GoogleMessagingProtocol {
  ping(): string;
  ping2(): string;
  ping3(): string;
  fromInjected(): string;
  fromInjected2(): string;
  fromInjected3(): string;
}

export const googleMessaging = defineWindowMessaging<GoogleMessagingProtocol>({
  namespace: '@webext-core/messaging-demo/google',
  logger: {...console, debug: console.log}
});
