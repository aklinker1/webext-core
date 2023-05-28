<!-- GENERATED FILE, DO NOT EDIT -->

# API Reference - `analytics`

> [`@webext-core/analytics`](/guide/analytics/)

## `createGoogleAnalyticsClient`

```ts
function createGoogleAnalyticsClient(
  config: GoogleAnalyticsConfig
): ExtensionAnalyticsClient {
  // ...
}
```

Returns a client for reporting analytics to Google Analytics 4 through the
[Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4).

It is worth noting that the measurment protocol restricts the reporting of some events, user
properties, and event parameters. [See the docs](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#reserved_names)
for more information. That means that this client WILL NOT provide the same amount of stats as
your standard web, gtag setup.

The client will:

- Upload a single event per network request
- Send the `context` and `page` as event parameterss
- Does not upload anything for `trackPageView` - the `page_view` event is one of the restricted events for the MP API

## `createUmamiClient`

```ts
function createUmamiClient(config: UmamiConfig): ExtensionAnalyticsClient {
  // ...
}
```

Umami is a privacy focused alternative to google analytics.

> https://umami.is/

The Umami client returned by this function:

- Uploads a single event at a time
- Sends the `context` string as the `hostname` parameter
- Does not upload anything for `trackPageView` - pages are apart of events.

## `defineExtensionAnalytics`

```ts
function defineExtensionAnalytics(config: ExtensionAnalyticsConfig) {
  // ...
}
```

Create extension analytics with the given configuration. Internally, it uses
`@webext-core/proxy-service` to execute all HTTP requests in the background.

### Examples

```ts
// analytics.ts
export const [registerAnalytics, getAnalytics] = defineExtensionAnalytics({
  client: createUmamiClient({ ... }),
  isEnabled: () => localExtStorage.getItem("opted-in"),
})
```

## `ExtensionAnalytics`

```ts
interface ExtensionAnalytics {
  init: (context: string) => void;
  trackEvent: (action: string, properties?: Record<string, any>) => void;
  trackPageView: (pathname: string) => void;
}
```

### Properties 

- ***`init: (context: string) => void`***<br/>Sets the current context, this should only be done once at the beginning of each entry point.
The context is which HTML page is open, which content script is being ran, if it's the
background page, etc. Will be reported as a property of all events and be apart of page views.

- ***`trackEvent: (action: string, properties?: Record<string, any>) => void`***<br/>Reports an event with an optional set of properties in key-value format.

- ***`trackPageView: (pathname: string) => void`***<br/>Tracks a page view. The `pathname` parameter should be the `location.pathname`. Depending on
the client, this may not send an HTTP request. It might just be stored in memory and included
in the `trackEvent` properties automatically.

## `ExtensionAnalyticsClient`

```ts
interface ExtensionAnalyticsClient {
  uploadEvent: (options: TrackEventOptions) => Promise<void>;
  uploadPageView?: (options: TrackPageViewOptions) => Promise<void>;
}
```

Client responsible for making the API calls to the Analytics service. Clients execute in the
background script so they aren't effected by CORS.

### Properties 

- ***`uploadEvent: (options: TrackEventOptions) => Promise<void>`***<br/>Reports an event to the analytics service. Called once for every event. When implementing a
client, you may choose to batch multiple events into a single network call.

- ***`uploadPageView?: (options: TrackPageViewOptions) => Promise<void>`***<br/>If the service supports it, upload page views separate from events. If the service doesn't
support it, every event also gets the page details, and can be reported inside `trackEvent`.

## `ExtensionAnalyticsConfig`

```ts
interface ExtensionAnalyticsConfig {
  client: ExtensionAnalyticsClient;
  isEnabled: () => boolean | Promise<boolean>;
  disableStandardEvents?: boolean;
  isEventSampled?: (
    action: string,
    sessionRandom: number
  ) => boolean | Promise<boolean>;
}
```

### Properties 

- ***`client: ExtensionAnalyticsClient`***<br/>The client to report analytics to. Use `defineUmamiClient`, `defineGoogleAnalyticsClient`, or
implement your own `ExtensionAnalyticsClient`.

- ***`isEnabled: () => boolean | Promise<boolean>`***<br/>Before an event is uploaded, this function is executed to see if the user has agreed to
collecting their data. Return `false` if they have opted-out, and `true` if they have opted-in.

- ***`disableStandardEvents?: boolean`*** (default: `true`)<br/>By default, the analytics application will track some standard events: `extension_installed`,
`extension_updated`, etc. By setting this to `false`, these events will not be tracked
automatically; you'll need to track them manually.

- ***`isEventSampled?: (action: string, sessionRandom: number) => boolean | Promise<boolean>`*** (default: `() => true`)<br/>By default, all events are uploaded. Define this function to sample events on the client side.
Return `true` if an event should be uploaded. Return false to skip uploading the event.

## `GoogleAnalyticsConfig`

```ts
interface GoogleAnalyticsConfig {
  measurementId: string;
  apiSecret: string;
  getUserId?: () => string | Promise<string>;
  getClientId: () => string | Promise<string>;
  debug?: boolean;
  nonPersonalizedAds?: boolean;
}
```

### Properties 

- ***`measurementId: string`***<br/>Used for the [`measurement_id` query parameter](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters).

- ***`apiSecret: string`***<br/>Used for the [`api_secret` query parameter](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters).

- ***`getUserId?: () => string | Promise<string>`***<br/>Return value used for the [`user_id` field in the request body](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body).

- ***`getClientId: () => string | Promise<string>`***<br/>Return value used for the [`client_id` field in the request body](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body).

- ***`debug?: boolean`***<br/>Set to `true` to enable debug mode. When `true`, requests will go to the
[`/debug/mp/collect` endpoint](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag#sending_events_for_validation)
instead of the regular [`/mp/collect` endpoint](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#url_endpoint).

- ***`nonPersonalizedAds?: boolean`***<br/>Used for the [`non_personalized_ads` field](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#payload_post_body) in the request body.

## `TrackBaseOptions`

```ts
interface TrackBaseOptions {
  context: string | undefined;
  screen: string | undefined;
  sessionId: number | undefined;
  timestamp: number;
  os: string | undefined;
  osVersion: string | undefined;
  browser: string | undefined;
  browserVersion: string | undefined;
  language: string | undefined;
  referrer: string | undefined;
  title: string | undefined;
}
```

### Properties 

- ***`context: string | undefined`***<br/>JS context the event was reported from.

- ***`screen: string | undefined`***<br/>Screen resolution.

- ***`sessionId: number | undefined`***<br/>The session ID is the timestamp in MS since epoch that the session was started.

- ***`timestamp: number`***<br/>The MS since epoch that the event was reported at.

- ***`os: string | undefined`***<br/>The operating system name from the `navigator.userAgent`

- ***`osVersion: string | undefined`***<br/>The operating system version from the `navigator.userAgent`

- ***`browser: string | undefined`***<br/>The browser name from the `navigator.userAgent`

- ***`browserVersion: string | undefined`***<br/>The browser version from the `navigator.userAgent`

- ***`language: string | undefined`***<br/>Language returned from [`browser.i18n.getUILanguage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/I18n/getUILanguage).

- ***`referrer: string | undefined`***<br/>From `document.referrer` if available.

- ***`title: string | undefined`***<br/>From `document.title` if available.

## `TrackEventOptions`

```ts
interface TrackEventOptions extends TrackPageViewOptions {
  action: string;
  properties: Record<string, any>;
}
```

### Properties 

- ***`action: string`***

- ***`properties: Record<string, any>`***

## `TrackPageViewOptions`

```ts
interface TrackPageViewOptions extends TrackBaseOptions {
  page?: string;
}
```

### Properties 

- ***`page?: string`***

## `UmamiConfig`

```ts
interface UmamiConfig {
  websiteId: string;
  url: string;
}
```

Used to pass config into `defineUmamiClient`.

### Properties 

- ***`websiteId: string`***<br/>See [Umami's documentation for more details](https://umami.is/docs/collect-data).

- ***`url: string`***<br/>URL to your Umami instance (`https://stats.aklinker1.io`,
`https://analytics.umami.is/share/LGazGOecbDtaIwDr/umami.is`, etc).

<br/><br/>

---

_API reference generated by [`plugins/typescript-docs.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/.vitepress/plugins/typescript-docs.ts)_