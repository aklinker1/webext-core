/**
 * Options that can be passed into `createIsolatedElement`.
 */
export interface CreateIsolatedElementOptions {
  /**
   * A unique HTML tag name (two words, kebab case - [see spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)) used when defining the web component used internally. Don't use the same name twice for different UIs.
   * @example "sticky-note"
   * @example "anime-skip-player"
   * @example "github-better-line-count-diff"
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
  /**
   * When enabled, `event.stopPropagation` will be called on events trying to bubble out of the shadow root.
   *
   * - Set to `true` to stop the propagation of a default set of events, `["keyup", "keydown", "keypress"]`
   * - Set to an array of event names to stop the propagation of a custom list of events
   */
  isolateEvents?: boolean | string[];
}
