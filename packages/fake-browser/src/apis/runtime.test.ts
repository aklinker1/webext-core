import { beforeEach, describe, expect, it, vi } from 'bun:test';

import { Browser } from '@wxt-dev/browser';

import { fakeBrowser } from '..';

describe('Fake Runtime API', () => {
  beforeEach(fakeBrowser.reset);

  describe('messaging', () => {
    it('should allow sending and receiving messages', async () => {
      fakeBrowser.runtime.onMessage.addListener((message, _, sendResponse) => {
        sendResponse(message + 1);
        return true;
      });
      const actual = await fakeBrowser.runtime.sendMessage(1);

      expect(actual).toEqual(2);
    });

    it("should return the first responder's response", async () => {
      fakeBrowser.runtime.onMessage.addListener((message, _, sendResponse) => {
        sendResponse(message + 1);
        return true;
      });
      fakeBrowser.runtime.onMessage.addListener((message, _, sendResponse) => {
        sendResponse(message + 2);
        return true;
      });

      const actual = await fakeBrowser.runtime.sendMessage('', 1);

      expect(actual).toEqual(2);
    });

    it('should call all the ', async () => {
      const listener1 = vi.fn((_1, _2, sendResponse) => {
        sendResponse(1);
        return true;
      });
      const listener2 = vi.fn((_1, _2, sendResponse) => {
        sendResponse(2);
        return true;
      });
      fakeBrowser.runtime.onMessage.addListener(listener1);
      fakeBrowser.runtime.onMessage.addListener(listener2);
      const sender = {};
      const message = 1;

      const actual = await fakeBrowser.runtime.sendMessage(message);

      expect(actual).toEqual(1);
      expect(listener1).toBeCalledTimes(1);
      expect(listener1).toBeCalledWith(message, sender, expect.any(Function));
      expect(listener2).toBeCalledTimes(1);
      expect(listener2).toBeCalledWith(message, sender, expect.any(Function));
    });

    it('should throw an error if there are no listeners setup', async () => {
      expect(fakeBrowser.runtime.sendMessage('some-message')).rejects.toThrowError(
        'No listeners available',
      );
    });
  });

  it('should trigger onStartup listeners', async () => {
    const listener = vi.fn();

    fakeBrowser.runtime.onStartup.addListener(listener);
    await fakeBrowser.runtime.onStartup.trigger();

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith();
  });

  it('should trigger onSuspend listeners', async () => {
    const listener = vi.fn();

    fakeBrowser.runtime.onSuspend.addListener(listener);
    await fakeBrowser.runtime.onSuspend.trigger();

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith();
  });

  it('should trigger onSuspendCanceled listeners', async () => {
    const listener = vi.fn();

    fakeBrowser.runtime.onSuspendCanceled.addListener(listener);
    await fakeBrowser.runtime.onSuspendCanceled.trigger();

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith();
  });

  it('should trigger onUpdateAvailable listeners', async () => {
    const listener = vi.fn();
    const input: Browser.runtime.UpdateAvailableDetails = {
      version: '1.0.2',
    };

    fakeBrowser.runtime.onUpdateAvailable.addListener(listener);
    await fakeBrowser.runtime.onUpdateAvailable.trigger(input);

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(input);
  });

  it('should trigger onInstalled listeners', async () => {
    const listener = vi.fn();
    const input: Browser.runtime.InstalledDetails = {
      reason: 'browser_update' as Browser.runtime.OnInstalledReason,
      previousVersion: '1.0.1',
    };

    fakeBrowser.runtime.onInstalled.addListener(listener);
    await fakeBrowser.runtime.onInstalled.trigger(input);

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(input);
  });

  describe('getURL', () => {
    it('should return an extension URL', () => {
      expect(fakeBrowser.runtime.getURL('options.html')).toBe(
        `chrome-extension://test-extension-id/options.html`,
      );
    });

    it('should return an extension URL, ignoring leading slashes', () => {
      expect(fakeBrowser.runtime.getURL('/options.html')).toBe(
        `chrome-extension://test-extension-id/options.html`,
      );
    });
  });
});
