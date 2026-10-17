import type { Browser } from '@wxt-dev/browser';

export class MockNotImplementedError extends Error {
  constructor(chain: string) {
    super(
      `${chain} not implemented: mock the function yourself using your testing framework, or submit a PR with an in-memory implementation.`,
    );
  }
}

/**
 * Real values from the extension APIs that aren't functions, so they can't throw a
 * `MockNotImplementedError` when used. Keyed by their path on the `browser` object.
 */
const knownValues: Record<string, unknown> = {
  'bookmarks.ROOT_NODE_ID': '0',
  'bookmarks.MAX_WRITE_OPERATIONS_PER_HOUR': 1000000,
  'bookmarks.MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE': 1000000,
  'contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT': 6,
  'declarativeNetRequest.DYNAMIC_RULESET_ID': '_dynamic',
  'declarativeNetRequest.SESSION_RULESET_ID': '_session',
  'declarativeNetRequest.GETMATCHEDRULES_QUOTA_INTERVAL': 10,
  'declarativeNetRequest.GUARANTEED_MINIMUM_STATIC_RULES': 30000,
  'declarativeNetRequest.MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL': 20,
  'declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES': 5000,
  'declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_RULES': 30000,
  'declarativeNetRequest.MAX_NUMBER_OF_SESSION_RULES': 5000,
  'declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES': 5000,
  'declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_SESSION_RULES': 5000,
  'declarativeNetRequest.MAX_NUMBER_OF_REGEX_RULES': 1000,
  'declarativeNetRequest.MAX_NUMBER_OF_STATIC_RULESETS': 100,
  'declarativeNetRequest.MAX_NUMBER_OF_ENABLED_STATIC_RULESETS': 50,
  'devtools.inspectedWindow.tabId': 0,
  'devtools.panels.themeName': 'default',
  'extension.inIncognitoContext': false,
  'extension.lastError': undefined,
  'gcm.MAX_MESSAGE_SIZE': 4096,
  'printing.MAX_GET_PRINTER_INFO_CALLS_PER_MINUTE': 20,
  'printing.MAX_SUBMIT_JOB_CALLS_PER_MINUTE': 40,
  'runtime.lastError': undefined,
  'sessions.MAX_SESSION_RESULTS': 25,
  'storage.local.QUOTA_BYTES': 10485760,
  'storage.session.QUOTA_BYTES': 10485760,
  'storage.sync.MAX_ITEMS': 512,
  'storage.sync.MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE': 1000000,
  'storage.sync.MAX_WRITE_OPERATIONS_PER_HOUR': 1800,
  'storage.sync.MAX_WRITE_OPERATIONS_PER_MINUTE': 120,
  'storage.sync.QUOTA_BYTES': 102400,
  'storage.sync.QUOTA_BYTES_PER_ITEM': 8192,
  'tabGroups.TAB_GROUP_ID_NONE': -1,
  'tabs.MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND': 2,
  'tabs.SPLIT_VIEW_ID_NONE': -1,
  'tabs.TAB_ID_NONE': -1,
  'tabs.TAB_INDEX_NONE': -1,
  'webRequest.MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES': 20,
  'windows.WINDOW_ID_CURRENT': -2,
  'windows.WINDOW_ID_NONE': -1,
};

/**
 * Properties used by the JS runtime and test frameworks. Faking them would break `await`,
 * serialization, string conversion, etc.
 */
const NEVER_FAKED = ['then', 'toJSON', 'toString', 'valueOf', 'constructor', 'inspect'];
const isFakeable = (key: string | symbol): key is string =>
  typeof key === 'string' && !NEVER_FAKED.includes(key);

const getFallback = (path: string) =>
  Object.hasOwn(knownValues, path) ? knownValues[path] : notImplemented(path);

/**
 * Returns a callable object that throws a `MockNotImplementedError` when called. Accessing any
 * property returns another one of these, so any depth of API can be called or overwritten:
 *
 * ```ts
 * fakeBrowser.cookies.get(); // throws MockNotImplementedError
 * fakeBrowser.cookies.get = vi.fn(); // no longer throws
 * ```
 */
function notImplemented(chain: string): any {
  const throwError = () => {
    throw new MockNotImplementedError(chain);
  };
  // Overwritten/lazily created properties. Stored outside the target so it doesn't inherit
  // anything from `Function.prototype`.
  const properties: Record<string, unknown> = {};

  return new Proxy(throwError, {
    apply: throwError,
    construct: throwError,
    get(target, key) {
      if (!isFakeable(key)) return Reflect.get(target, key);
      if (!(key in properties)) properties[key] = getFallback(`${chain}.${key}`);
      return properties[key];
    },
    set(_, key, value) {
      properties[key as string] = value;
      return true;
    },
    deleteProperty: (_, key) => delete properties[key as string],
    has: (_, key) => key in properties,
    ownKeys: () => Object.keys(properties),
    getOwnPropertyDescriptor: (_, key) =>
      key in properties
        ? {
            value: properties[key as string],
            writable: true,
            enumerable: true,
            configurable: true,
          }
        : undefined,
  });
}

const isNamespace = (value: unknown): value is object =>
  typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;

const proxies = new WeakMap<object, any>();

function fake<T extends object>(impl: T, chain: string): T {
  const existing = proxies.get(impl);
  if (existing) return existing;

  // Cached outside the implementation so it isn't mutated, but fallbacks still have a stable
  // identity and can be overwritten.
  const fallbacks: Record<string, unknown> = {};
  const proxy = new Proxy(impl, {
    get(target, key, receiver) {
      if (Reflect.has(target, key)) {
        const value = Reflect.get(target, key, receiver);
        // Recursively fake namespaces (`browser.storage.local`) so their unimplemented
        // properties throw as well.
        return isNamespace(value) ? fake(value, `${chain}${String(key)}.`) : value;
      }
      if (!isFakeable(key)) return undefined;
      if (!(key in fallbacks)) fallbacks[key] = getFallback(chain + key);
      return fallbacks[key];
    },
    set: (target, key, value) => Reflect.set(target, key, value),
  });
  proxies.set(impl, proxy);
  return proxy;
}

/**
 * Wrap in-memory implementations of the extension APIs with a proxy. Any API that isn't implemented
 * throws a `MockNotImplementedError` when called, and any value or function can be overwritten by
 * setting it: `fakeBrowser.runtime.id = 'test'`.
 */
export function createFakeBrowser<T extends object>(impl: T): T & typeof Browser {
  return fake(impl, '') as T & typeof Browser;
}
