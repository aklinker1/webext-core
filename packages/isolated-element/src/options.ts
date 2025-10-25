/**
 * Options that can be passed into `createIsolatedElement`.
 */
export interface CreateIsolatedElementOptions {
  /**
   * An HTML tag name used for the shadow root container.
   *
   * Note that you can't attach a shadow root to every type of element. There are some that can't have a shadow DOM for security reasons (for example <a>).
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to
   * @example "sticky-note"
   * @example "anime-skip-player"
   * @example "github-better-line-count-diff"
   * @example "div"
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
