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
});
