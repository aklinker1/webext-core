/**
 * @vitest-environment jsdom
 */
import { describe, beforeEach, it, expect, vi } from 'vitest';
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
    const input = document.createElement('input');
    isolatedElement.append(input);
    document.body.append(parentElement);
    document.body.append(isolatedElement);

    const listener = vi.fn();
    document.body.addEventListener('keyup', listener);

    const event = new KeyboardEvent('keyup', {
      bubbles: true,
    });
    input.dispatchEvent(event);

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(event);
  });

  it('should not allow event propagation when isolateEvents is set to true', async () => {
    const name = 'event-test-element-isolated';

    const { isolatedElement, parentElement } = await createIsolatedElement({
      name,
      isolateEvents: true,
    });
    const input = document.createElement('input');
    isolatedElement.append(input);
    document.body.append(parentElement);
    document.body.append(isolatedElement);

    const listener = vi.fn();
    document.body.addEventListener('keyup', listener);

    const event = new KeyboardEvent('keyup', {
      bubbles: true,
    });
    input.dispatchEvent(event);

    expect(listener).not.toBeCalled();
  });

  it('should allow event propagation conditionally when isolateEvents is set to an array of events', async () => {
    const name = 'event-test-element-isolated';

    const { isolatedElement, parentElement } = await createIsolatedElement({
      name,
      isolateEvents: ['click'],
    });
    const input = document.createElement('input');
    isolatedElement.append(input);
    document.body.append(parentElement);
    document.body.append(isolatedElement);

    const clickListener = vi.fn();
    const keyupListener = vi.fn();
    document.body.addEventListener('click', clickListener);
    document.body.addEventListener('keyup', keyupListener);

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
    });
    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true,
    });
    input.dispatchEvent(clickEvent);
    input.dispatchEvent(keyupEvent);

    expect(clickListener).not.toBeCalled();
    expect(keyupListener).toBeCalledTimes(1);
    expect(keyupListener).toBeCalledWith(keyupEvent);
  });
});
