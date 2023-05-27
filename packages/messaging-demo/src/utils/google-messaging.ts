import { defineWindowMessaging } from '@webext-core/messaging/page';

export interface GoogleMessagingProtocol {
  ping(): string;
}

export const googleMessaging = defineWindowMessaging<GoogleMessagingProtocol>({
  namespace: '@webext-core/messaging-demo/google',
});
