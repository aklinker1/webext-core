import browser from 'webextension-polyfill';
import { ExtensionAnalytics, ExtensionAnalyticsConfig } from '../types';
import { TrackBaseOptions, TrackEventOptions, TrackPageViewOptions } from '../clients';
import UAParser from 'ua-parser-js';

export function createExtensionAnalytics(config: ExtensionAnalyticsConfig): ExtensionAnalytics {
  const { client } = config;
  const logger = config.logger === null ? null : config.logger ?? console;
  let currentContext: string | undefined;
  let currentPage: string | undefined;
  const sessionId = Date.now();
  const sessionRandom = Math.random();

  const isEnabled = async (isSampled?: () => boolean | Promise<boolean>): Promise<boolean> => {
    const sampled = await (isSampled ?? (() => true))();
    if (!sampled) return false;

    return await config.isEnabled();
  };

  const ua = UAParser(navigator.userAgent);

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
      referrer: globalThis.document?.referrer,
      title: globalThis.document?.title,
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
    const options: TrackEventOptions = {
      timestamp,
      action,
      properties: properties ?? {},
      context,
      page,
      ...baseOptions,
    };
    logger?.log('Reporting event: ' + action, options);

    await client
      .uploadEvent(options)
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
    const options: TrackPageViewOptions = {
      timestamp,
      context,
      page,
      ...baseOptions,
    };
    logger?.log('Reporting page view: ' + page, options);
    await client
      .uploadPageView?.(options)
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
      void trackEventAsync(timestamp, context, page, action, properties).catch(logger?.warn);
    },

    trackPageView(page) {
      const timestamp = Date.now();
      currentPage = page;

      // Grab variables synchronously
      const context = currentContext;
      void trackPageViewAsync(timestamp, context, page).catch(logger?.warn);
    },
  };
}
