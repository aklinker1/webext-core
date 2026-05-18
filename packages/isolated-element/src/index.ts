import isPotentialCustomElementName from 'is-potential-custom-element-name';
import { CreateIsolatedElementOptions } from './options';

/**
 * Built-in elements that can have a shadow root attached to them.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to
 */
const ALLOWED_SHADOW_ELEMENTS = [
  'article',
  'aside',
  'blockquote',
  'body',
  'div',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'main',
  'nav',
  'p',
  'section',
  'span',
];

export type { CreateIsolatedElementOptions };

/**
 * Create an HTML element that has isolated styles from the rest of the page.
 * @param options
 * @returns
 * - A `parentElement` that can be added to the DOM
 * - The `shadow` root
 * - An `isolatedElement` that you should mount your UI to.
 *
 * @example
 * const { isolatedElement, parentElement } = createIsolatedElement({
 *   name: 'example-ui',
 *   css: { textContent: "p { color: red }" },
 *   isolateEvents: true // or ['keydown', 'keyup', 'keypress']
 * });
 *
 * // Create and mount your app inside the isolation
 * const ui = document.createElement("p");
 * ui.textContent = "Example UI";
 * isolatedElement.appendChild(ui);
 *
 * // Add the UI to the DOM
 * document.body.appendChild(parentElement);
 */
export async function createIsolatedElement(options: CreateIsolatedElementOptions): Promise<{
  parentElement: HTMLElement;
  isolatedElement: HTMLElement;
  shadow: ShadowRoot;
}> {
  const { name, mode = 'closed', css, isolateEvents = false } = options;

  if (!ALLOWED_SHADOW_ELEMENTS.includes(name) && !isPotentialCustomElementName(name)) {
    throw Error(
      `"${name}" cannot have a shadow root attached to it. It must be two words and kebab-case, with a few exceptions. See https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to`,
    );
  }

  // Create the root, parent element
  const parentElement = document.createElement(name);

  // Create the shadow and isolated nodes
  const shadow = parentElement.attachShadow({ mode });
  const isolatedElement = document.createElement('div');

  // Load the UI's stylesheet
  if (css) {
    const style = document.createElement('style');
    if ('url' in css) {
      style.textContent = await fetch(css.url).then(res => res.text());
    } else {
      style.textContent = css.textContent;
    }
    shadow.appendChild(style);
  }

  // Add the isolated element to the shadow so it shows up once the parentElement is mounted
  shadow.appendChild(isolatedElement);

  // Add logic to prevent event bubbling if isolateEvents is true or a list of events
  if (isolateEvents) {
    const eventTypes = Array.isArray(isolateEvents)
      ? isolateEvents
      : ['keydown', 'keyup', 'keypress'];
    eventTypes.forEach(eventType => {
      shadow.addEventListener(eventType, e => e.stopPropagation());
    });
  }

  return {
    parentElement,
    shadow,
    isolatedElement,
  };
}
