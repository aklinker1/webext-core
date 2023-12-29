/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect } from 'vitest';
import { createIsolatedElement } from './index';

describe('createIsolatedElement', () => {
  beforeEach(() => {
    document.querySelector('body')!.innerHTML = '';
  });

  it('should insert an app into the UI', async () => {
    const text = 'Example';
    const appId = 'app';
    const name = 'test-element';

    const app = (element: HTMLElement) => {
      const p = document.createElement('p');
      p.id = appId;
      p.textContent = text;
      element.append(p);
    };
    const { isolatedElement, parentElement } = await createIsolatedElement({ name });
    app(isolatedElement);
    document.body.append(parentElement);

    expect(document.querySelector(name)).toBeDefined();
    expect(document.getElementById('app')).toBeDefined();
    expect(isolatedElement.textContent).toEqual(text);
    expect(parentElement.textContent).toEqual('');
  });

  it('should allow event propagation when isolateEvents is not set', async () => {
    const name = 'event-test-element-default';

    const { isolatedElement, parentElement } = await createIsolatedElement({ name });
    document.body.append(parentElement);
    let eventFired = false;
    document.body.addEventListener('keyup', () => {
      eventFired = true;
    });
    const input = document.createElement('input');
    isolatedElement.appendChild(input);
    document.body.appendChild(isolatedElement);
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
    });
    input.dispatchEvent(event);

    expect(eventFired).toBe(true);
  });

  it('should not allow event propagation when isolateEvents is set to true', async () => {
    const name = 'event-test-element-isolated';

    const { isolatedElement, parentElement } = await createIsolatedElement({
      name,
      isolateEvents: true,
    });
    document.body.append(parentElement);
    let eventFired = false;
    document.body.addEventListener('keyup', () => {
      eventFired = true;
    });
    const input = document.createElement('input');
    isolatedElement.appendChild(input);
    document.body.appendChild(isolatedElement);
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
    });
    input.dispatchEvent(event);

    expect(eventFired).toBe(false);
  });

  it('should allow event propagation conditionally when isolateEvents is set to an array of events', async () => {
    const name = 'event-test-element-isolated';

    const { isolatedElement, parentElement } = await createIsolatedElement({
      name,
      isolateEvents: ['click'],
    });
    document.body.append(parentElement);
    let eventFired = {
      click: false,
      keyup: false,
    };
    document.body.addEventListener('click', () => {
      eventFired['click'] = true;
    });
    document.body.addEventListener('keyup', () => {
      eventFired['keyup'] = true;
    });
    const input = document.createElement('input');
    isolatedElement.appendChild(input);
    document.body.appendChild(isolatedElement);
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
    });
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true,
    });
    input.dispatchEvent(clickEvent);
    input.dispatchEvent(keyupEvent);

    expect(eventFired['click']).toBe(false);
    expect(eventFired['keyup']).toBe(true);
  });
});
