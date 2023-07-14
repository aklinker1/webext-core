import { defineProxyService } from '@webext-core/proxy-service';
import { createExtensionAnalytics } from './utils/createAnalytics';
import { ExtensionAnalyticsClient } from './clients';
import { ExtensionAnalytics, ExtensionAnalyticsConfig } from './types';
import { trackStandardEvents } from './utils/trackStandardEvents';

/**
 * Create extension analytics with the given configuration. Internally, it uses
 * `@webext-core/proxy-service` to execute all HTTP requests in the background.
 *
 * @example
 * // analytics.ts
 * export const [registerAnalytics, getAnalytics] = defineExtensionAnalytics({
 *   client: createUmamiClient({ ... }),
 *   isEnabled: () => localExtStorage.getItem("opted-in"),
 * })
 */
export function defineExtensionAnalytics(config: ExtensionAnalyticsConfig) {
  const [registerClient, getClient] = defineProxyService(
    '@webext-core/analytics-client',
    (client: ExtensionAnalyticsClient) => client,
    config,
  );

  let singletonAnalytics: ExtensionAnalytics | undefined;

  return [
    function registerAnalytics(): ExtensionAnalytics {
      registerClient(config.client);

      const analytics = createExtensionAnalytics(config);
      if (!config.disableStandardEvents) trackStandardEvents(analytics);

      return (singletonAnalytics = analytics);
    },

    function getAnalytics(): ExtensionAnalytics {
      if (singletonAnalytics) return singletonAnalytics;

      const client = getClient();
      const analytics = createExtensionAnalytics({ ...config, client });

      return (singletonAnalytics = analytics);
    },
  ];
}
