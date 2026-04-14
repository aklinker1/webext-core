import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fakeBrowser } from '../index';

describe('windows', () => {
  beforeEach(fakeBrowser.reset);

  describe('remove', () => {
    it('should trigger onRemoved event when removing a window', async () => {
      const listener = vi.fn();
      fakeBrowser.windows.onRemoved.addListener(listener);

      const newWindow = await fakeBrowser.windows.create();
      await fakeBrowser.windows.remove(newWindow.id!);

      expect(listener).toHaveBeenCalledWith(newWindow.id);
    });

    it('should remove window from windowList', async () => {
      const window1 = await fakeBrowser.windows.create();
      const window2 = await fakeBrowser.windows.create();

      const allWindowsBefore = await fakeBrowser.windows.getAll();
      expect(allWindowsBefore).toHaveLength(3); // default + 2 new

      await fakeBrowser.windows.remove(window1.id!);

      const allWindowsAfter = await fakeBrowser.windows.getAll();
      expect(allWindowsAfter).toHaveLength(2);
      expect(allWindowsAfter.find(w => w.id === window1.id)).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should trigger onCreated event', async () => {
      const listener = vi.fn();
      fakeBrowser.windows.onCreated.addListener(listener);

      const newWindow = await fakeBrowser.windows.create();

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          id: newWindow.id,
          focused: false,
        }),
      );
    });
  });

  describe('tabs and windows interaction', () => {
    it('should remove window when last tab is removed', async () => {
      const windowListener = vi.fn();
      fakeBrowser.windows.onRemoved.addListener(windowListener);

      const window = await fakeBrowser.windows.create();
      const tab = await fakeBrowser.tabs.create({ windowId: window.id });

      // Remove the only tab in the window
      await fakeBrowser.tabs.remove(tab.id!);

      // Window should be removed automatically
      expect(windowListener).toHaveBeenCalledWith(window.id);

      const allWindows = await fakeBrowser.windows.getAll();
      expect(allWindows.find(w => w.id === window.id)).toBeUndefined();
    });
  });
});
