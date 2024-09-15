import { defineCustomEventMessaging } from '@webext-core/messaging/page';

export interface DuckduckgoMessagingProtocol {
  ping(): string;
  ping2(): string;
  ping3(): string;
  fromInjected(): string;
  fromInjected2(): string;
  fromInjected3(): string;
}

export const duckduckgoMessaging = defineCustomEventMessaging<DuckduckgoMessagingProtocol>({
  namespace: '@webext-core/messaging-demo/duckduckgo',
});
