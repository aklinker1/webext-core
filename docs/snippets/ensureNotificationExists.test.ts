import { describe, it, beforeEach, vi, expect } from 'vitest';
import browser, { Notifications } from 'webextension-polyfill';
import { fakeBrowser } from '@webext-core/fake-browser';

async function ensureNotificationExists(
  id: string,
  notification: Notifications.CreateNotificationOptions,
): Promise<void> {
  const notifications = await browser.notifications.getAll();
  if (!notifications[id]) await browser.notifications.create(id, notification);
}

describe('ensureNotificationExists', () => {
  const id = 'some-id';
  const notification: Notifications.CreateNotificationOptions = {
    type: 'basic',
    title: 'Some Title',
    message: 'Some message...',
  };

  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('should create a notification if it does not exist', async () => {
    const createSpy = vi.spyOn(browser.notifications, 'create');

    await ensureNotificationExists(id, notification);

    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith(id, notification);
  });

  it('should not create the notification if it already exists', async () => {
    await fakeBrowser.notifications.create(id, notification);
    const createSpy = vi.spyOn(browser.notifications, 'create');

    await ensureNotificationExists(id, notification);

    expect(createSpy).not.toBeCalled();
  });
});
