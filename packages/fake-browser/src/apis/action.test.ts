import { beforeEach, describe, expect, it } from 'vitest';

// Import your fake browser implementation
import { fakeBrowser } from '..';

describe('Fake Action API', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  describe('setTitle / getTitle', () => {
    it('should set and get global title', async () => {
      const title = 'Test Title';
      await fakeBrowser.action.setTitle({ title });
      const result = await fakeBrowser.action.getTitle({});
      expect(result).toBe(title);
    });

    it('should set and get tab-specific title', async () => {
      const tabId = 123;
      const title = 'Tab Title';
      await fakeBrowser.action.setTitle({ tabId, title });
      const result = await fakeBrowser.action.getTitle({ tabId });
      expect(result).toBe(title);
    });
  });

  describe('setBadgeText / getBadgeText', () => {
    it('should set and get global badge text', async () => {
      const text = '10';
      await fakeBrowser.action.setBadgeText({ text });
      const result = await fakeBrowser.action.getBadgeText({});
      expect(result).toBe(text);
    });

    it('should set and get tab-specific badge text', async () => {
      const tabId = 123;
      const text = '99+';
      await fakeBrowser.action.setBadgeText({ tabId, text });
      const result = await fakeBrowser.action.getBadgeText({ tabId });
      expect(result).toBe(text);
    });

    it('should return empty string if no badge text is set', async () => {
      const result = await fakeBrowser.action.getBadgeText({});
      expect(result).toBe('');
    });
  });

  describe('setBadgeBackgroundColor / getBadgeBackgroundColor', () => {
    it('should set and get global badge background color', async () => {
      const color = '#FF0000'; // red
      await fakeBrowser.action.setBadgeBackgroundColor({ color });
      const result = await fakeBrowser.action.getBadgeBackgroundColor({});
      expect(result).toEqual([255, 0, 0, 255]);
    });

    it('should set and get tab-specific badge background color', async () => {
      const tabId = 123;
      const color = '#00FF00'; // green
      await fakeBrowser.action.setBadgeBackgroundColor({ tabId, color });
      const result = await fakeBrowser.action.getBadgeBackgroundColor({ tabId });
      expect(result).toEqual([0, 255, 0, 255]);
    });

    it('should fallback to default gray color if any color not set', async () => {
      const result = await fakeBrowser.action.getBadgeBackgroundColor({});
      expect(result).toEqual([95, 93, 91, 255]);
    });
  });

  describe('setBadgeTextColor / getBadgeTextColor', () => {
    it('should set and get global badge text color', async () => {
      const color = '#0000FF';
      fakeBrowser.action.setBadgeTextColor({ color });
      //@ts-ignore
      fakeBrowser.action.getBadgeTextColor({}, result => {
        expect(result).toEqual(color);
      });
    });

    it('should set and get tab-specific badge text color', async () => {
      const tabId = 123;
      const color = '#00FFFF';
      fakeBrowser.action.setBadgeTextColor({ tabId, color });
      //@ts-ignore
      fakeBrowser.action.getBadgeTextColor({ tabId }, result => {
        expect(result).toBe(color);
      });
    });
  });
});
