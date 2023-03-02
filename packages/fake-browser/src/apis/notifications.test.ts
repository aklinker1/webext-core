import { beforeEach, describe, expect, it } from 'vitest';
import { Notifications } from 'webextension-polyfill';
import { fakeBrowser } from '..';

describe('Fake Notifications API', () => {
  beforeEach(fakeBrowser.reset);

  describe('create', () => {
    it('should create a notification and return the ID', async () => {
      const id = await fakeBrowser.notifications.create({ type: 'basic', message: '', title: '' });
      expect(id).toBeDefined();
    });

    it('should create a notification and return the provided ID', async () => {
      const expected = 'some-id';
      const actual = await fakeBrowser.notifications.create(expected, {
        message: '',
        title: '',
        type: 'basic',
      });

      expect(actual).toBe(expected);
    });

    it('should replace an existing notification with the same id', async () => {
      const id = 'another-id';
      const originalNotification: Notifications.CreateNotificationOptions = {
        type: 'basic',
        title: 'original',
        message: 'original',
      };
      const newNotification: Notifications.CreateNotificationOptions = {
        type: 'basic',
        title: 'original',
        message: 'original',
      };

      await fakeBrowser.notifications.create(id, originalNotification);
      await fakeBrowser.notifications.create(id, newNotification);

      await expect(fakeBrowser.notifications.getAll()).resolves.toEqual({
        [id]: newNotification,
      });
    });
  });

  describe('getAll', () => {
    it('should return notifications created by create', async () => {
      const notification1: Notifications.CreateNotificationOptions = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      };
      const notification2: Notifications.CreateNotificationOptions = {
        type: 'list',
        title: 'title 2',
        message: 'message 2',
        items: [],
      };
      const expected = {
        '1': notification1,
        '2': notification2,
      };

      await fakeBrowser.notifications.create('1', notification1);
      await fakeBrowser.notifications.create('2', notification2);

      await expect(fakeBrowser.notifications.getAll()).resolves.toEqual(expected);
    });
  });

  describe('clear', () => {
    it('should remove an existing notification and return true', async () => {
      const id = 'id2';
      const notification: Notifications.CreateNotificationOptions = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      };

      await fakeBrowser.notifications.create(id, notification);
      await expect(fakeBrowser.notifications.getAll()).resolves.toEqual({ [id]: notification });

      const actual = await fakeBrowser.notifications.clear(id);

      await expect(fakeBrowser.notifications.getAll()).resolves.toEqual({});
      expect(actual).toBe(true);
    });

    it('should do nothing and return false when the notification does not exist', async () => {
      const id = 'id2';
      const notification: Notifications.CreateNotificationOptions = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      };

      await fakeBrowser.notifications.create(id, notification);
      await expect(fakeBrowser.notifications.getAll()).resolves.toEqual({ [id]: notification });

      const actual = await fakeBrowser.notifications.clear('not' + id);

      await expect(fakeBrowser.notifications.getAll()).resolves.toEqual({ [id]: notification });
      expect(actual).toBe(false);
    });
  });
});
