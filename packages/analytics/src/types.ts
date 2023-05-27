import { ExtensionAnalyticsClient } from './clients';

export interface ExtensionAnalytics {
  /**
   * Sets the current context, this should only be done once at the beginning of each entry point.
   * The context is which HTML page is open, which content script is being ran, if it's the
   * background page, etc. Will be reported as a property of all events and be apart of page views.
   */
  init: (context: string) => void;
  /**
   * Reports an event with an optional set of properties in key-value format.
   */
  trackEvent: (action: string, properties?: Record<string, any>) => void;
  /**
   * Tracks a page view. The `pathname` parameter should be the `location.pathname`. Depending on
   * the client, this may not send an HTTP request. It might just be stored in memory and included
   * in the `trackEvent` properties automatically.
   */
  trackPageView: (pathname: string) => void;
}

export interface ExtensionAnalyticsConfig {
  /**
   * The client to report analytics to. Use `defineUmamiClient`, `defineGoogleAnalyticsClient`, or
   * implement your own `ExtensionAnalyticsClient`.
   */
  client: ExtensionAnalyticsClient;
  /**
   * Before an event is uploaded, this function is executed to see if the user has agreed to
   * collecting their data. Return `false` if they have opted-out, and `true` if they have opted-in.
   */
  isEnabled: () => boolean | Promise<boolean>;
  /**
   * Returns the user id that may be reported with events and page views. If this method is not
   * provided, a random UUID will be generated and stored in storage. If the storage permission is
   * missing, the user ID will not be included in any reports.
   */
  getUserId?: () => string | Promise<string>;
  /**
   * By default, the analytics application will track some standard events: `extension_installed`,
   * `extension_updated`, etc. By setting this to `false`, these events will not be tracked
   * automatically; you'll need to track them manually.
   *
   * @default true
   */
  disableStandardEvents?: boolean;
  /**
   * By default, all events are uploaded. Define this function to sample events on the client side.
   * Return `true` if an event should be uploaded. Return false to skip uploading the event.
   *
   * @param action The event's action that was reported.
   * @param sessionRandom A random decimal between 0-1 that can be used to decide if an event should be sampled.
   *
   * @default () => true
   *
   * @example
   * const DEFAULT_SESSION_SAMPLE_RATE = 0.25; // 25%
   * const DEFAULT_ACTION_SAMPLE_RATE = 0.5; // 50%
   *
   * const ACTION_SAMPLE_RATES = {
   *   button_clicked: 0.1, // 10%
   *   extension_installed: 1.0, // 100%
   * }
   *
   * function isEventSampled(action: string, sessionRandom: number): boolean {
   *   // Only accept events from 25% of sessions
   *   if (sessionRandom > 0.25) return false;
   *
   *   // Custom sample rates for individual events, defaulting to 50%
   *   const actionSampleRate = ACTION_SAMPLE_RATES[action] ?? 0.5;
   *   const actionRandom = Math.random();
   *   return actionRandom <= actionSampleRate;
   * }
   */
  isEventSampled?: (action: string, sessionRandom: number) => boolean | Promise<boolean>;
}
