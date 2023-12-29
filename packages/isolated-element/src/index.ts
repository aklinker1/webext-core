import { CreateIsolatedElementOptions } from './options';

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

  // Create the root, parent element
  const parentElement = document.createElement(name);

  // Create the shadow and isolated nodes
  const shadow = parentElement.attachShadow({ mode });
  const isolatedElement = document.createElement('html');
  const body = document.createElement('body');
  const head = document.createElement('head');

  // Load the UI's stylesheet
  if (css) {
    const style = document.createElement('style');
    if ('url' in css) {
      style.textContent = await fetch(css.url).then(res => res.text());
    } else {
      style.textContent = css.textContent;
    }
    head.appendChild(style);
  }

  // Add head and body to html element
  isolatedElement.appendChild(head);
  isolatedElement.appendChild(body);

  // Add the isolated element to the shadow so it shows up once the parentElement is mounted
  shadow.appendChild(isolatedElement);

  // Add logic to prevent event bubbling if isolateEvents is true or a list of events
  if (isolateEvents) {
    const eventTypes = Array.isArray(isolateEvents)
      ? isolateEvents
      : ['keydown', 'keyup', 'keypress'];
    eventTypes.forEach(eventType => {
      body.addEventListener(eventType, e => e.stopPropagation());
    });
  }

  return {
    parentElement,
    shadow,
    isolatedElement: body,
  };
}
