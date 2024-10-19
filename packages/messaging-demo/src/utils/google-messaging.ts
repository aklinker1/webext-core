import { defineWindowMessaging } from '@webext-core/messaging/page';

export interface GoogleMessagingProtocol {
  ping(): string;
  ping2(): string;
  fromInjected(): string;
  fromInjected2(): string;
}

export const googleMessaging = defineWindowMessaging<GoogleMessagingProtocol>({
  namespace: '@webext-core/messaging-demo/google',
});
