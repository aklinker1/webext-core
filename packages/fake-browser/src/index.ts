import { runtime } from './apis/runtime';
import { alarms } from './apis/alarms';
import { storage } from './apis/storage';
import { tabs } from './apis/tabs';
import { windows } from './apis/windows';
import { BrowserOverrides, FakeBrowser } from './types';
import { GeneratedBrowser } from './base.gen';
import merge from 'lodash.merge';

export type { FakeBrowser, BrowserOverrides };

const overrides: BrowserOverrides = {
  reset() {
    for (const [name, api] of Object.entries(fakeBrowser)) {
      if (name !== 'reset') (api as any).resetState?.();
    }
  },

  // Implemented
  alarms,
  storage,
  runtime,
  tabs,
  windows,
};

export const fakeBrowser: FakeBrowser = merge(GeneratedBrowser, overrides);
