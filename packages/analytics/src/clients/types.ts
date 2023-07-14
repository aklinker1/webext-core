/**
 * Client responsible for making the API calls to the Analytics service. Clients execute in the
 * background script so they aren't effected by CORS.
 */
export interface ExtensionAnalyticsClient {
  /**
   * Reports an event to the analytics service. Called once for every event. When implementing a
   * client, you may choose to batch multiple events into a single network call.
   */
  uploadEvent: (options: TrackEventOptions) => Promise<void>;
  /**
   * If the service supports it, upload page views separate from events. If the service doesn't
   * support it, every event also gets the page details, and can be reported inside `trackEvent`.
   */
  uploadPageView?: (options: TrackPageViewOptions) => Promise<void>;
}

export interface TrackBaseOptions {
  /**
   * JS context the event was reported from.
   */
  context: string | undefined;
  /**
   * Screen resolution.
   */
  screen: string | undefined;
  /**
   * The session ID is the timestamp in MS since epoch that the session was started.
   */
  sessionId: number | undefined;
  /**
   * The MS since epoch that the event was reported at.
   */
  timestamp: number;
  /**
   * The operating system name from the `navigator.userAgent`
   */
  os: string | undefined;
  /**
   * The operating system version from the `navigator.userAgent`
   */
  osVersion: string | undefined;
  /**
   * The browser name from the `navigator.userAgent`
   */
  browser: string | undefined;
  /**
   * The browser version from the `navigator.userAgent`
   */
  browserVersion: string | undefined;
  /**
   * Language returned from [`browser.i18n.getUILanguage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/I18n/getUILanguage).
   */
  language: string | undefined;
  /**
   * From `document.referrer` if available.
   */
  referrer: string | undefined;
  /**
   * From `document.title` if available.
   */
  title: string | undefined;
}

export interface TrackPageViewOptions extends TrackBaseOptions {
  page?: string;
}

export interface TrackEventOptions extends TrackPageViewOptions {
  action: string;
  properties: Record<string, any>;
}
