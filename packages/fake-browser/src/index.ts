import { Browser } from '@wxt-dev/browser';
import merge from 'lodash.merge';

import { action, ActionOverrides } from './apis/action';
import { alarms, AlarmsOverrides } from './apis/alarms';
import { notifications, NotificationsOverrides } from './apis/notifications';
import { runtime, RuntimeOverrides } from './apis/runtime';
import { storage, StorageOverrides } from './apis/storage';
import { tabs, TabsOverrides } from './apis/tabs';
import { webNavigation, WebNavigationOverrides } from './apis/webNavigation';
import { WindowOverrides, windows } from './apis/windows';
import { base } from './base';

export interface BrowserOverrides {
  /**
   * Reset the fake browser. Remove all listeners and clear all in-memory state, like storage,
   * windows, and tabs.
   *
   * This is often called before each test.
   */
  reset(): void;

  action: ActionOverrides;
  alarms: AlarmsOverrides;
  notifications: NotificationsOverrides;
  runtime: RuntimeOverrides;
  storage: StorageOverrides;
  tabs: TabsOverrides;
  webNavigation: WebNavigationOverrides;
  windows: WindowOverrides;
}

/**
 * The standard `chrome`/`browser` interface from `@wxt-dev/browser`, but with additional functions
 * for triggering events and resetting state.
 */
export type FakeBrowser = BrowserOverrides & typeof Browser;

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
export const fakeBrowser: FakeBrowser = merge(base, overrides);
