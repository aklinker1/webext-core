import { localExtStorage } from '@webext-core/storage';
import browser from 'webextension-polyfill';
import { ExtensionAnalytics, ExtensionAnalyticsConfig } from '../types';
import { TrackBaseOptions } from '../clients';
import UAParser from 'ua-parser-js';

export function createExtensionAnalytics(config: ExtensionAnalyticsConfig): ExtensionAnalytics {
  const { client } = config;
  let currentContext: string | undefined;
  let currentPage: string | undefined;
  const sessionId = Date.now();
  const sessionRandom = Math.random();

  const isEnabled = async (isSampled?: () => boolean | Promise<boolean>): Promise<boolean> => {
    const sampled = await (isSampled ?? (() => true))();
    if (!sampled) return false;

    return await isEnabled();
  };

  const ua = UAParser(navigator.userAgent);

  const getUserId = async (): Promise<string | undefined> => {
    if (config.getUserId) return await config.getUserId();
    if (browser.storage == null) return undefined;

    const userId: string | null = await localExtStorage.getItem('@webext-core/analytics/userId');
    return userId ?? undefined;
  };

  const getBaseOptions = async (): Promise<Omit<TrackBaseOptions, 'context' | 'timestamp'>> => {
    return {
      browser: ua.browser.name,
      browserVersion: ua.browser.version,
      language: browser.i18n?.getUILanguage?.() ?? globalThis.navigator?.language,
      os: ua.os.name,
      osVersion: ua.os.version,
      screen: globalThis.screen
        ? `${globalThis.screen.width}x${globalThis.screen.height}`
        : undefined,
      sessionId,
      userId: await getUserId(),
    };
  };

  const trackEventAsync = async (
    timestamp: number,
    context: string | undefined,
    page: string | undefined,
    action: string,
    properties: Record<string, any> | undefined,
  ) => {
    const isEventSampled = config.isEventSampled;
    const enabled = await isEnabled(
      isEventSampled ? () => isEventSampled(action, sessionRandom) : undefined,
    );
    if (!enabled) return;

    const baseOptions = await getBaseOptions();

    await client
      .uploadEvent({
        timestamp,
        action,
        properties: properties ?? {},
        context,
        page,
        ...baseOptions,
      })
      // ignore network errors
      .catch();
  };

  const trackPageViewAsync = async (
    timestamp: number,
    context: string | undefined,
    page: string | undefined,
  ) => {
    if (client.uploadPageView == null) return;

    const enabled = await isEnabled();
    if (!enabled) return;

    const baseOptions = await getBaseOptions();
    await client
      .uploadPageView?.({
        timestamp,
        context,
        page,
        ...baseOptions,
      })
      // ignore network errors
      .catch();
  };

  return {
    init(context) {
      currentContext = context;
    },

    trackEvent(action, properties) {
      const timestamp = Date.now();

      // Grab variables synchronously
      const context = currentContext;
      const page = currentPage;
      void trackEventAsync(timestamp, context, page, action, properties);
    },

    trackPageView(page) {
      const timestamp = Date.now();
      currentPage = page;

      // Grab variables synchronously
      const context = currentContext;
      void trackPageViewAsync(timestamp, context, page);
    },
  };
}
