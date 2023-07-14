import browser from 'webextension-polyfill';
import { ExtensionAnalytics } from '../types';

export function trackStandardEvents(analytics: ExtensionAnalytics): void {
  // Install events
  browser.runtime.onInstalled.addListener(({ reason }) => {
    const { version, version_name } = browser.runtime.getManifest();
    if (reason === 'install') {
      analytics.trackEvent('extension_installed', { version, version_name });
    } else if (reason === 'update') {
      analytics.trackEvent('extension_updated', { version, version_name });
    } else {
      analytics.trackEvent('browser_updated', { version, version_name });
    }
  });

  // ...
}
