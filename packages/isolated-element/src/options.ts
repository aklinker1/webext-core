/**
 * Options that can be passed into `createIsolatedElement`.
 */
export interface CreateIsolatedElementOptions {
  /**
   * A unique tag name used when defining the web component used internally. Don't use the same name twice for different UIs.
   */
  name: string;
  /**
   * See [`ShadowRoot.mode`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode).
   *
   * @default 'closed'
   */
  mode?: 'open' | 'closed';
  /**
   * Either the URL to a CSS file or the text contents of a CSS file. The styles will be mounted inside the shadow DOM so they don't effect the rest of the page.
   */
  css?: { url: string } | { textContent: string };
}
