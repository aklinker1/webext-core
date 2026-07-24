import { beforeEach, describe, expect, it } from 'bun:test';

import { Browser } from '@wxt-dev/browser';

import { fakeBrowser } from '..';

describe('Fake Notifications API', () => {
  beforeEach(fakeBrowser.reset);

  describe('create', () => {
    it('should create a notification and return the ID', async () => {
      const id = await fakeBrowser.notifications.create({
        type: 'basic',
        message: '',
        title: '',
      } as Browser.notifications.NotificationCreateOptions);
      expect(id).toBeDefined();
    });

    it('should create a notification and return the provided ID', async () => {
      const expected = 'some-id';
      const actual = await fakeBrowser.notifications.create(expected, {
        message: '',
        title: '',
        type: 'basic',
      } as Browser.notifications.NotificationCreateOptions);

      expect(actual).toBe(expected);
    });

    it('should replace an existing notification with the same id', async () => {
      const id = 'another-id';
      const originalNotification = {
        type: 'basic',
        title: 'original',
        message: 'original',
      } as Browser.notifications.NotificationCreateOptions;
      const newNotification = {
        type: 'basic',
        title: 'original',
        message: 'original',
      } as Browser.notifications.NotificationCreateOptions;

      await fakeBrowser.notifications.create(id, originalNotification);
      await fakeBrowser.notifications.create(id, newNotification);

      expect(fakeBrowser.notifications.getAll()).resolves.toEqual({
        [id]: true,
      });
    });
  });

  describe('getAll', () => {
    it('should return notifications created by create', async () => {
      const notification1 = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      } as Browser.notifications.NotificationCreateOptions;
      const notification2 = {
        type: 'list',
        title: 'title 2',
        message: 'message 2',
      } as Browser.notifications.NotificationCreateOptions;
      const expected = {
        '1': true,
        '2': true,
      } as const;

      await fakeBrowser.notifications.create('1', notification1);
      await fakeBrowser.notifications.create('2', notification2);

      expect(fakeBrowser.notifications.getAll()).resolves.toEqual(expected);
    });
  });

  describe('getAllCreateOptions', () => {
    it('should return notifications created by create', async () => {
      const notification1 = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      } as Browser.notifications.NotificationCreateOptions;
      const notification2 = {
        type: 'list',
        title: 'title 2',
        message: 'message 2',
      } as Browser.notifications.NotificationCreateOptions;
      const expected = {
        '1': notification1,
        '2': notification2,
      };

      await fakeBrowser.notifications.create('1', notification1);
      await fakeBrowser.notifications.create('2', notification2);

      expect(fakeBrowser.notifications.getAllCreateOptions()).toEqual(expected);
    });
  });

  describe('clear', () => {
    it('should remove an existing notification and return true', async () => {
      const id = 'id2';
      const notification = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      } as Browser.notifications.NotificationCreateOptions;

      await fakeBrowser.notifications.create(id, notification);
      expect(fakeBrowser.notifications.getAll()).resolves.toEqual({ [id]: true });

      const actual = await fakeBrowser.notifications.clear(id);

      expect(fakeBrowser.notifications.getAll()).resolves.toEqual({});
      expect(actual).toBe(true);
    });

    it('should do nothing and return false when the notification does not exist', async () => {
      const id = 'id2';
      const notification = {
        type: 'basic',
        title: 'title 1',
        message: 'message 1',
      } as Browser.notifications.NotificationCreateOptions;

      await fakeBrowser.notifications.create(id, notification);
      expect(fakeBrowser.notifications.getAll()).resolves.toEqual({ [id]: true });

      const actual = await fakeBrowser.notifications.clear('not' + id);

      expect(fakeBrowser.notifications.getAll()).resolves.toEqual({ [id]: true });
      expect(actual).toBe(false);
    });
  });
});
