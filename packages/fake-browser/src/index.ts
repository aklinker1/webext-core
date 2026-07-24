import { action } from './apis/action';
import { alarms } from './apis/alarms';
import { notifications } from './apis/notifications';
import { runtime } from './apis/runtime';
import { storage } from './apis/storage';
import { tabs } from './apis/tabs';
import { webNavigation } from './apis/webNavigation';
import { windows } from './apis/windows';
import { createMockNotImplementedProxy } from './mock-not-implemented-proxy';
import { BrowserOverrides, FakeBrowser } from './types';

export type { FakeBrowser };

const overrides: BrowserOverrides = {
  reset() {
    for (const [name, api] of Object.entries(fakeBrowser)) {
      if (name !== 'reset' && typeof api?.resetState === 'function') api.resetState();
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

/** An in-memory implementation of the `browser` global. */
export const fakeBrowser: FakeBrowser = createMockNotImplementedProxy('chrome', overrides);
