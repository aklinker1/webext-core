import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fakeBrowser } from '../index';

describe('tabs', () => {
  beforeEach(fakeBrowser.reset);

  describe('create', () => {
    it('should create a new tab and add it to tabList', async () => {
      const newTab = await fakeBrowser.tabs.create({ url: 'https://example.com' });

      expect(newTab).toBeDefined();
      expect(newTab.id).toBe(1);
      expect(newTab.url).toBe('https://example.com');

      const tabs = await fakeBrowser.tabs.query({});
      expect(tabs).toHaveLength(2); // default tab + new tab
    });

    it('should trigger onCreated event', async () => {
      const listener = vi.fn();
      fakeBrowser.tabs.onCreated.addListener(listener);

      const newTab = await fakeBrowser.tabs.create({ url: 'https://example.com' });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          id: newTab.id,
          url: 'https://example.com',
        }),
      );
    });
  });

  describe('query', () => {
    it('should filter tabs by windowId', async () => {
      const window2 = await fakeBrowser.windows.create();
      const tab1 = await fakeBrowser.tabs.create({ url: 'https://window1.com' });
      const tab2 = await fakeBrowser.tabs.create({
        url: 'https://window2.com',
        windowId: window2.id,
      });

      const window1Tabs = await fakeBrowser.tabs.query({ windowId: 0 });
      expect(window1Tabs).toHaveLength(2); // default + tab1

      const window2Tabs = await fakeBrowser.tabs.query({ windowId: window2.id });
      expect(window2Tabs).toHaveLength(1);
      expect(window2Tabs[0].url).toBe('https://window2.com');
    });
  });
});
