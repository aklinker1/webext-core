import { describe, expect, it, vi } from 'bun:test';

import { fakeBrowser } from '.';
import { MockNotImplementedError } from './base';

describe('Base Implementation', () => {
  it('should throw a MockNotImplementedError when calling an API that is not implemented', () => {
    expect(() => fakeBrowser.cookies.getAll({})).toThrowError(MockNotImplementedError);
    expect(() => fakeBrowser.runtime.getManifest()).toThrowError(
      /runtime\.getManifest not implemented/,
    );
    expect(() => fakeBrowser.devtools.panels.elements.createSidebarPane('test')).toThrowError(
      /devtools\.panels\.elements\.createSidebarPane not implemented/,
    );
  });

  it('should return the same object every time a not implemented API is accessed', () => {
    expect(fakeBrowser.cookies.getAll).toBe(fakeBrowser.cookies.getAll);
    expect(fakeBrowser.runtime.onMessage).toBe(fakeBrowser.runtime.onMessage);
  });

  it('should allow overriding functions and values at any depth', async () => {
    const getAll = vi.fn(async () => []);
    fakeBrowser.cookies.getAll = getAll;
    fakeBrowser.runtime.id = 'custom-id';

    expect(await fakeBrowser.cookies.getAll({})).toEqual([]);
    expect(getAll).toBeCalledTimes(1);
    expect(fakeBrowser.runtime.id).toBe('custom-id');

    fakeBrowser.reset();
  });

  it('should return the real value for known constants and properties', () => {
    expect(fakeBrowser.tabs.TAB_ID_NONE).toBe(-1);
    expect(fakeBrowser.storage.sync.QUOTA_BYTES).toBe(102400);
    expect(fakeBrowser.runtime.lastError).toBeUndefined();
    expect(fakeBrowser.extension.inIncognitoContext).toBe(false);
  });

  it('should not fake properties used by the JS runtime', async () => {
    await expect(Promise.resolve(fakeBrowser.cookies)).resolves.toBeDefined();
    expect(() => String(fakeBrowser.cookies)).not.toThrow();
  });
});
