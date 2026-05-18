import { alarms } from './apis/alarms';
import { notifications } from './apis/notifications';
import { runtime } from './apis/runtime';
import { storage } from './apis/storage';
import { tabs } from './apis/tabs';
import { webNavigation } from './apis/webNavigation';
import { windows } from './apis/windows';
import { action } from './apis/action';
import { BrowserOverrides, FakeBrowser } from './types';
import { GeneratedBrowser } from './base.gen';
import merge from 'lodash.merge';

export type { FakeBrowser };

const overrides: BrowserOverrides = {
  reset() {
    for (const [name, api] of Object.entries(fakeBrowser)) {
      if (name !== 'reset') (api as any).resetState?.();
    }
  },

  // Implemented
  alarms,
  notifications,
  runtime,
  storage,
  tabs,
  webNavigation,
  windows,
  action,
};

/**
 * An in-memory implementation of the `browser` global.
 */
export const fakeBrowser: FakeBrowser = merge(GeneratedBrowser, overrides);
