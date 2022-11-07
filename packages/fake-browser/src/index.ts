import { runtime } from './apis/runtime';
import { alarms } from './apis/alarms';
import { storage } from './apis/storage';
import { FakeBrowser } from './types';
import { notImplementedApi } from './utils/notImplementedApi';

export type { FakeBrowser };

export const fakeBrowser: FakeBrowser = {
  async reset() {
    for (const [name, api] of Object.entries(fakeBrowser)) {
      if (name !== 'reset') {
        const { reset } = api as any;
        if (reset == null)
          console.warn(
            `\x1b[93m@webext-core/fake-browser: Browser.${name}.reset() is not defined\x1b[0m`,
          );
        else reset();
      }
    }
  },
  // Implemented
  alarms,
  storage,
  runtime,

  // Not implemented
  activityLog: notImplementedApi('activityLog'),
  bookmarks: notImplementedApi('bookmarks'),
  action: notImplementedApi('action'),
  browserAction: notImplementedApi('browserAction'),
  browserSettings: notImplementedApi('browserSettings'),
  browsingData: notImplementedApi('browsingData'),
  captivePortal: notImplementedApi('captivePortal'),
  clipboard: notImplementedApi('clipboard'),
  commands: notImplementedApi('commands'),
  contentScripts: notImplementedApi('contentScripts'),
  contextualIdentities: notImplementedApi('contextualIdentities'),
  cookies: notImplementedApi('cookies'),
  declarativeContent: notImplementedApi('declarativeContent'),
  devtools: notImplementedApi('devtools'),
  dns: notImplementedApi('dns'),
  downloads: notImplementedApi('downloads'),
  events: notImplementedApi('events'),
  experiments: notImplementedApi('experiments'),
  extension: notImplementedApi('extension'),
  extensionTypes: notImplementedApi('extensionTypes'),
  find: notImplementedApi('find'),
  geckoProfiler: notImplementedApi('geckoProfiler'),
  history: notImplementedApi('history'),
  i18n: notImplementedApi('i18n'),
  identity: notImplementedApi('identity'),
  idle: notImplementedApi('idle'),
  management: notImplementedApi('management'),
  manifest: notImplementedApi('manifest'),
  contextMenus: notImplementedApi('contextMenus'),
  menus: notImplementedApi('menus'),
  networkStatus: notImplementedApi('networkStatus'),
  normandyAddonStudy: notImplementedApi('normandyAddonStudy'),
  notifications: notImplementedApi('notifications'),
  omnibox: notImplementedApi('omnibox'),
  pageAction: notImplementedApi('pageAction'),
  permissions: notImplementedApi('permissions'),
  pkcs11: notImplementedApi('pkcs11'),
  privacy: notImplementedApi('privacy'),
  proxy: notImplementedApi('proxy'),
  scripting: notImplementedApi('scripting'),
  search: notImplementedApi('search'),
  sessions: notImplementedApi('sessions'),
  sidebarAction: notImplementedApi('sidebarAction'),
  tabs: notImplementedApi('tabs'),
  theme: notImplementedApi('theme'),
  topSites: notImplementedApi('topSites'),
  types: notImplementedApi('types'),
  urlbar: notImplementedApi('urlbar'),
  userScripts: notImplementedApi('userScripts'),
  webNavigation: notImplementedApi('webNavigation'),
  webRequest: notImplementedApi('webRequest'),
  windows: notImplementedApi('windows'),
};
