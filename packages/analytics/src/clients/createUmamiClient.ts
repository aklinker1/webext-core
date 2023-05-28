import { ExtensionAnalyticsClient } from './types';

/**
 * Used to pass config into `defineUmamiClient`.
 */
export interface UmamiConfig {
  /**
   * See [Umami's documentation for more details](https://umami.is/docs/collect-data).
   */
  websiteId: string;
  /**
   * URL to your Umami instance (`https://stats.aklinker1.io`,
   * `https://analytics.umami.is/share/LGazGOecbDtaIwDr/umami.is`, etc).
   */
  url: string;
}

/**
 * Creates an `ExtensionAnalyticsClient` for <https://umami.is>.
 *
 * @example
 * import { createUmamiClient } from '@webext-core/analytics';
 *
 * const umami = createUmamiClient({
 *   websiteId: "...",
 *   sendUrl: "https://stats.aklinker1.io"
 * });
 * export const [registerAnalytics, getAnalytics] = defineExtensionAnalytics({
 *   client: umami,
 *   ...
 * })
 */
export function createUmamiClient(config: UmamiConfig): ExtensionAnalyticsClient {
  const baseUrl = config.url.endsWith('/')
    ? config.url.substring(config.url.length - 1)
    : config.url;
  const sendUrl = `${baseUrl}/api/send`;

  return {
    async uploadEvent(options) {
      const body: RequestBody = {
        type: 'event',
        payload: {
          name: options.action,
          hostname: options.context ?? '',
          language: options.language ?? '',
          referrer: options.referrer ?? '',
          screen: options.screen ?? '',
          title: options.title ?? '',
          url: options.page ?? '/',
          website: config.websiteId,
          data: options.properties,
        },
      };

      await fetch(sendUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': navigator.userAgent,
        },
      });
    },
  };
}

/**
 * See https://umami.is/docs/sending-stats
 */
interface RequestBody {
  type: 'event';
  payload: {
    hostname: string;
    language: string;
    referrer: string;
    screen: string;
    title: string;
    url: string;
    website: string;
    name: string;
    data?: Record<string, any>;
  };
}
