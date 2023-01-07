import { CreateIsolatedElementOptions } from './options';
import '@webcomponents/webcomponentsjs';

export type { CreateIsolatedElementOptions };

export async function createIsolatedElement(options: CreateIsolatedElementOptions): Promise<{
  parentElement: HTMLElement;
  isolatedElement: HTMLElement;
  shadow: ShadowRoot;
}> {
  const { name, mode = 'closed', css } = options;

  // Create the root, parent element
  customElements.define(name, class extends HTMLElement {});
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

  return {
    parentElement,
    shadow,
    isolatedElement: body,
  };
}
