import { ExtensionAnalyticsClient } from './types';

export interface GoogleAnalyticsConfig {
  /**
   * Used for the [`measurement_id` query parameter](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters).
   */
  measurementId: string;
  /**
   * Used for the [`api_secret` query parameter](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters).
   */
  apiSecret: string;
  /**
   * Return value used for the [`user_id` field in the request body](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body).
   */
  getUserId?: () => string | Promise<string>;
  /**
   * Return value used for the [`client_id` field in the request body](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body).
   */
  getClientId: () => string | Promise<string>;
  /**
   * Set to `true` to enable debug mode. When `true`, requests will go to the
   * [`/debug/mp/collect` endpoint](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag#sending_events_for_validation)
   * instead of the regular [`/mp/collect` endpoint](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#url_endpoint).
   */
  debug?: boolean;
  /**
   * Used for the [`non_personalized_ads` field](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body) in the request body.
   */
  nonPersonalizedAds?: boolean;
}

/**
 * Creates an `ExtensionAnalyticsClient` for Google Analytics 4 using the
 * [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4).
 *
 * @example
 * import { createGoogleAnalytics4Client } from '@webext-core/analytics';
 *
 * function generateRandomId(): string {
 *   // ...
 * }
 *
 * async function getOrInit(key: string, init: () => string): Promise<string> {
 *   const value = localExtStorage.getItem(key);
 *   if (value != null) return value;
 *
 *   const newValue = init();
 *   await localExtStorage.setItem(key, newValue);
 *   return newValue;
 * }
 *
 * const googleAnalytics = createGoogleAnalytics4Client({
 *   measurementId: "...",
 *   apiSecret: "...",
 *   nonPersonalizedAds: true,
 *   getUserId: () => getOrInit("googleAnalytics/userId", generateRandomId),
 *   getClientId: () => getOrInit("googleAnalytics/clientId", generateRandomId),
 * })
 */
export function createGoogleAnalytics4Client(
  config: GoogleAnalyticsConfig,
): ExtensionAnalyticsClient {
  const prodUrl = 'https://www.google-analytics.com/mp/collect';
  const debugUrl = 'https://www.google-analytics.com/debug/mp/collect';

  return {
    async uploadEvent(options) {
      const url = new URL(config.debug ? debugUrl : prodUrl);
      url.searchParams.set('measurement_id', config.measurementId);
      url.searchParams.set('api_secret', config.apiSecret);

      // TODO: figure out how to report the os/browser info and language
      const body: RequestBody = {
        client_id: await config.getClientId(),
        user_id: await config.getUserId?.(),
        non_personalized_ads: config.nonPersonalizedAds,
        timestamp_micros: options.timestamp * 1000,
        events: [
          {
            name: options.action,
            params: {
              page: options.page,
              context: options.context,
              engagement_time_msec: options.sessionId
                ? String(Date.now() - options.sessionId)
                : undefined,
              session_id: options.sessionId ? String(options.sessionId) : undefined,
            },
          },
        ],
      };
      await fetch(url.href, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
  };
}

interface RequestBody {
  client_id: string;
  user_id?: string;
  timestamp_micros?: number;
  user_properties?: Record<string, { value: any }>;
  non_personalized_ads?: boolean;
  events: Array<{
    name: string;
    params: {
      /**
       * See [Recommended Parameters for Reports](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports).
       */
      engagement_time_msec?: string;
      /**
       * See [Recommended Parameters for Reports](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports).
       */
      session_id?: string;
      [param: string]: any;
    };
  }>;
}
