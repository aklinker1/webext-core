import { ExtensionAnalyticsClient } from './types';

/**
 * Returns a client for reporting analytics to Google Analytics 4 through the
 * [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4).
 *
 * It is worth noting that the measurment protocol restricts the reporting of some events, user
 * properties, and event parameters. [See the docs](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#reserved_names)
 * for more information. That means that this client WILL NOT provide the same amount of stats as
 * your standard web, gtag setup.
 *
 * The client will:
 *
 * - Upload a single event per network request
 * - Send the `context` and `page` as event parameterss
 * - Does not upload anything for `trackPageView` - the `page_view` event is one of the restricted events for the MP API
 */
export function createGoogleAnalyticsClient(
  config: GoogleAnalyticsConfig,
): ExtensionAnalyticsClient {
  const prodUrl = 'https://www.google-analytics.com/mp/collect';
  const debugUrl = 'https://www.google-analytics.com/debug/mp/collect';

  return {
    async uploadEvent(options) {
      const url = new URL(config.debug ? debugUrl : prodUrl);
      url.searchParams.set('measurement_id', config.measurementId);
      url.searchParams.set('api_secret', config.apiSecret);
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

export interface GoogleAnalyticsConfig {
  /**
   * Used for the `measurement_id` query parameter.
   */
  measurementId: string;
  /**
   * Used for the `api_secret` query parameter.
   */
  apiSecret: string;
  /**
   * Return value used for the `user_id` field in the request body.
   */
  getUserId?: () => string | Promise<string>;
  /**
   * Return value used for the `client_id` field in the request body.
   */
  getClientId: () => string | Promise<string>;
  /**
   * Set to true to enable debug mode - requests will go to the `/debug/mp/collect` endpoint instead of the regular `/mp/collect` endpoint.
   */
  debug?: boolean;
  /**
   * Used for `non_personalized_ads` in the request body.
   */
  nonPersonalizedAds?: boolean;
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
      engagement_time_msec?: string;
      session_id?: string;
      [param: string]: any;
    };
  }>;
}
