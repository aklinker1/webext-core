<!-- GENERATED FILE, DO NOT EDIT -->

# API Reference - `analytics`

> [`@webext-core/analytics`](/guide/analytics/)

## `Array`

```ts
interface Array<T> {
  length: number;
  toString(): string;
  toLocaleString(): string;
  pop(): T | undefined;
  push(...items: T[]): number;
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  join(separator?: string): string;
  reverse(): T[];
  shift(): T | undefined;
  slice(start?: number, end?: number): T[];
  sort(compareFn?: (a: T, b: T) => number): this;
  splice(start: number, deleteCount?: number): T[];
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  unshift(...items: T[]): number;
  indexOf(searchElement: T, fromIndex?: number): number;
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[];
  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
  [n: number]: T;
}

var Array: ArrayConstructor;

interface Array<T> {
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined;
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number;
  fill(value: T, start?: number, end?: number): this;
  copyWithin(target: number, start: number, end?: number): this;
}

interface Array<T> {
  [Symbol.iterator](): IterableIterator<T>;
  entries(): IterableIterator<[number, T]>;
  keys(): IterableIterator<number>;
  values(): IterableIterator<T>;
}

interface Array<T> {
  [Symbol.unscopables](): {
    copyWithin: boolean;
    entries: boolean;
    fill: boolean;
    find: boolean;
    findIndex: boolean;
    keys: boolean;
    values: boolean;
  };
}

interface Array<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
}

interface Array<T> {
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: T[]
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
}

interface Array<T> {
  at(index: number): T | undefined;
}
```

### Properties 

- ***`length:number`***

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
  getUserId?: () => string | Promise<string>;
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

- ***`getUserId?: () => string | Promise<string>`***<br/>Returns the user id that may be reported with events and page views. If this method is not
provided, a random UUID will be generated and stored in storage. If the storage permission is
missing, the user ID will not be included in any reports.

- ***`disableStandardEvents?: boolean`*** (default: `true`)<br/>By default, the analytics application will track some standard events: `extension_installed`,
`extension_updated`, etc. By setting this to `false`, these events will not be tracked
automatically; you'll need to track them manually.

- ***`isEventSampled?: (action: string, sessionRandom: number) => boolean | Promise<boolean>`*** (default: `() => true`)<br/>By default, all events are uploaded. Define this function to sample events on the client side.
Return `true` if an event should be uploaded. Return false to skip uploading the event.

## `TrackBaseOptions`

```ts
interface TrackBaseOptions {
  userId: string | undefined;
  context: string | undefined;
  screen: string | undefined;
  sessionId: number | undefined;
  timestamp: number;
  os: string | undefined;
  osVersion: string | undefined;
  browser: string | undefined;
  browserVersion: string | undefined;
  language: string | undefined;
}
```

### Properties 

- ***`userId: string | undefined`***<br/>ID of the user reporting the event.

- ***`context: string | undefined`***<br/>JS context the event was reported from.

- ***`screen: string | undefined`***<br/>Screen resolution.

- ***`sessionId: number | undefined`***<br/>The session ID is the timestamp in MS since epoch that the session was started.

- ***`timestamp: number`***<br/>The MS since epoch that the event was reported at.

- ***`os: string | undefined`***<br/>The operating system name from the `navigator.userAgent`

- ***`osVersion: string | undefined`***<br/>The operating system version from the `navigator.userAgent`

- ***`browser: string | undefined`***<br/>The browser name from the `navigator.userAgent`

- ***`browserVersion: string | undefined`***<br/>The browser version from the `navigator.userAgent`

- ***`language: string | undefined`***<br/>Language returned from [`browser.i18n.getUILanguage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/I18n/getUILanguage).

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

<br/><br/>

---

_API reference generated by [`plugins/typescript-docs.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/.vitepress/plugins/typescript-docs.ts)_