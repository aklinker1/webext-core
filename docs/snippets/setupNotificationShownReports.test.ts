import { describe, it, beforeEach, vi, expect } from 'vitest';
import browser from 'webextension-polyfill';
import { fakeBrowser } from '@webext-core/fake-browser';

async function setupNotificationShownReports(
  reportEvent: (notificationId: string) => void,
): Promise<void> {
  browser.notifications.onShown.addListener(id => reportEvent(id));
}

describe('setupNotificationShownReports', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('should properly report an analytics event when a notification is shown', async () => {
    const reportAnalyticsEvent = vi.fn();
    const id = 'notification-id';

    setupNotificationShownReports(reportAnalyticsEvent);
    await fakeBrowser.notifications.onShown.trigger(id);

    expect(reportAnalyticsEvent).toBeCalledTimes(1);
    expect(reportAnalyticsEvent).toBeCalledWith(id);
  });
});
