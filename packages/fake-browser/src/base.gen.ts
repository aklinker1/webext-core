/**
 * DO NOT EDIT. THIS IS A GENERATED FILE.
 *
 * ```bash
 * pnpm gen
 * ```
 */

import type { Browser } from 'webextension-polyfill';

class MockNotImplementedError extends Error {
  constructor(chain: string) {
    super(
      `${chain} not implemented: mock the function yourself using your testing framework, or submit a PR with an in-memory implementation.`,
    );
  }
}

export const GeneratedBrowser: Browser = {
  activityLog: {
    onExtensionActivity: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.activityLog.onExtensionActivity.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.activityLog.onExtensionActivity.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.activityLog.onExtensionActivity.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.activityLog.onExtensionActivity.hasListeners');
      },
    },
  },
  alarms: {
    create: () => {
      throw new MockNotImplementedError('Browser.alarms.create');
    },
    get: () => {
      throw new MockNotImplementedError('Browser.alarms.get');
    },
    getAll: () => {
      throw new MockNotImplementedError('Browser.alarms.getAll');
    },
    clear: () => {
      throw new MockNotImplementedError('Browser.alarms.clear');
    },
    clearAll: () => {
      throw new MockNotImplementedError('Browser.alarms.clearAll');
    },
    onAlarm: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.alarms.onAlarm.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.alarms.onAlarm.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.alarms.onAlarm.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.alarms.onAlarm.hasListeners');
      },
    },
  },
  bookmarks: {
    get: () => {
      throw new MockNotImplementedError('Browser.bookmarks.get');
    },
    getChildren: () => {
      throw new MockNotImplementedError('Browser.bookmarks.getChildren');
    },
    getRecent: () => {
      throw new MockNotImplementedError('Browser.bookmarks.getRecent');
    },
    getTree: () => {
      throw new MockNotImplementedError('Browser.bookmarks.getTree');
    },
    getSubTree: () => {
      throw new MockNotImplementedError('Browser.bookmarks.getSubTree');
    },
    search: () => {
      throw new MockNotImplementedError('Browser.bookmarks.search');
    },
    create: () => {
      throw new MockNotImplementedError('Browser.bookmarks.create');
    },
    move: () => {
      throw new MockNotImplementedError('Browser.bookmarks.move');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.bookmarks.update');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.bookmarks.remove');
    },
    removeTree: () => {
      throw new MockNotImplementedError('Browser.bookmarks.removeTree');
    },
    onCreated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onCreated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onCreated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onCreated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onCreated.hasListeners');
      },
    },
    onRemoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onRemoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onRemoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onRemoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onRemoved.hasListeners');
      },
    },
    onChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onChanged.hasListeners');
      },
    },
    onMoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onMoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onMoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onMoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.bookmarks.onMoved.hasListeners');
      },
    },
  },
  action: {
    setTitle: () => {
      throw new MockNotImplementedError('Browser.action.setTitle');
    },
    getTitle: () => {
      throw new MockNotImplementedError('Browser.action.getTitle');
    },
    getUserSettings: () => {
      throw new MockNotImplementedError('Browser.action.getUserSettings');
    },
    setIcon: () => {
      throw new MockNotImplementedError('Browser.action.setIcon');
    },
    setPopup: () => {
      throw new MockNotImplementedError('Browser.action.setPopup');
    },
    getPopup: () => {
      throw new MockNotImplementedError('Browser.action.getPopup');
    },
    setBadgeText: () => {
      throw new MockNotImplementedError('Browser.action.setBadgeText');
    },
    getBadgeText: () => {
      throw new MockNotImplementedError('Browser.action.getBadgeText');
    },
    setBadgeBackgroundColor: () => {
      throw new MockNotImplementedError('Browser.action.setBadgeBackgroundColor');
    },
    getBadgeBackgroundColor: () => {
      throw new MockNotImplementedError('Browser.action.getBadgeBackgroundColor');
    },
    setBadgeTextColor: () => {
      throw new MockNotImplementedError('Browser.action.setBadgeTextColor');
    },
    getBadgeTextColor: () => {
      throw new MockNotImplementedError('Browser.action.getBadgeTextColor');
    },
    enable: () => {
      throw new MockNotImplementedError('Browser.action.enable');
    },
    disable: () => {
      throw new MockNotImplementedError('Browser.action.disable');
    },
    isEnabled: () => {
      throw new MockNotImplementedError('Browser.action.isEnabled');
    },
    openPopup: () => {
      throw new MockNotImplementedError('Browser.action.openPopup');
    },
    onClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.action.onClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.action.onClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.action.onClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.action.onClicked.hasListeners');
      },
    },
  },
  browserAction: {
    setTitle: () => {
      throw new MockNotImplementedError('Browser.browserAction.setTitle');
    },
    getTitle: () => {
      throw new MockNotImplementedError('Browser.browserAction.getTitle');
    },
    getUserSettings: () => {
      throw new MockNotImplementedError('Browser.browserAction.getUserSettings');
    },
    setIcon: () => {
      throw new MockNotImplementedError('Browser.browserAction.setIcon');
    },
    setPopup: () => {
      throw new MockNotImplementedError('Browser.browserAction.setPopup');
    },
    getPopup: () => {
      throw new MockNotImplementedError('Browser.browserAction.getPopup');
    },
    setBadgeText: () => {
      throw new MockNotImplementedError('Browser.browserAction.setBadgeText');
    },
    getBadgeText: () => {
      throw new MockNotImplementedError('Browser.browserAction.getBadgeText');
    },
    setBadgeBackgroundColor: () => {
      throw new MockNotImplementedError('Browser.browserAction.setBadgeBackgroundColor');
    },
    getBadgeBackgroundColor: () => {
      throw new MockNotImplementedError('Browser.browserAction.getBadgeBackgroundColor');
    },
    setBadgeTextColor: () => {
      throw new MockNotImplementedError('Browser.browserAction.setBadgeTextColor');
    },
    getBadgeTextColor: () => {
      throw new MockNotImplementedError('Browser.browserAction.getBadgeTextColor');
    },
    enable: () => {
      throw new MockNotImplementedError('Browser.browserAction.enable');
    },
    disable: () => {
      throw new MockNotImplementedError('Browser.browserAction.disable');
    },
    isEnabled: () => {
      throw new MockNotImplementedError('Browser.browserAction.isEnabled');
    },
    openPopup: () => {
      throw new MockNotImplementedError('Browser.browserAction.openPopup');
    },
    onClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.browserAction.onClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.browserAction.onClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.browserAction.onClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.browserAction.onClicked.hasListeners');
      },
    },
  },
  browserSettings: {
    allowPopupsForUserEvents: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.allowPopupsForUserEvents.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.allowPopupsForUserEvents.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.allowPopupsForUserEvents.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.allowPopupsForUserEvents.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.allowPopupsForUserEvents.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.allowPopupsForUserEvents.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.allowPopupsForUserEvents.onChange.hasListeners',
          );
        },
      },
    },
    cacheEnabled: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.cacheEnabled.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.cacheEnabled.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.cacheEnabled.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.cacheEnabled.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.cacheEnabled.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.cacheEnabled.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.cacheEnabled.onChange.hasListeners',
          );
        },
      },
    },
    closeTabsByDoubleClick: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.closeTabsByDoubleClick.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.closeTabsByDoubleClick.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.closeTabsByDoubleClick.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.closeTabsByDoubleClick.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.closeTabsByDoubleClick.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.closeTabsByDoubleClick.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.closeTabsByDoubleClick.onChange.hasListeners',
          );
        },
      },
    },
    contextMenuShowEvent: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.contextMenuShowEvent.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.contextMenuShowEvent.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.contextMenuShowEvent.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.contextMenuShowEvent.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.contextMenuShowEvent.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.contextMenuShowEvent.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.contextMenuShowEvent.onChange.hasListeners',
          );
        },
      },
    },
    homepageOverride: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.homepageOverride.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.homepageOverride.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.homepageOverride.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.homepageOverride.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.homepageOverride.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.homepageOverride.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.homepageOverride.onChange.hasListeners',
          );
        },
      },
    },
    imageAnimationBehavior: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.imageAnimationBehavior.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.imageAnimationBehavior.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.imageAnimationBehavior.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.imageAnimationBehavior.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.imageAnimationBehavior.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.imageAnimationBehavior.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.imageAnimationBehavior.onChange.hasListeners',
          );
        },
      },
    },
    newTabPageOverride: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.newTabPageOverride.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.newTabPageOverride.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.newTabPageOverride.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPageOverride.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPageOverride.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPageOverride.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPageOverride.onChange.hasListeners',
          );
        },
      },
    },
    newTabPosition: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.newTabPosition.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.newTabPosition.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.newTabPosition.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPosition.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPosition.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPosition.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.newTabPosition.onChange.hasListeners',
          );
        },
      },
    },
    openBookmarksInNewTabs: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openBookmarksInNewTabs.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openBookmarksInNewTabs.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openBookmarksInNewTabs.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openBookmarksInNewTabs.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openBookmarksInNewTabs.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openBookmarksInNewTabs.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openBookmarksInNewTabs.onChange.hasListeners',
          );
        },
      },
    },
    openSearchResultsInNewTabs: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openSearchResultsInNewTabs.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openSearchResultsInNewTabs.set');
      },
      clear: () => {
        throw new MockNotImplementedError(
          'Browser.browserSettings.openSearchResultsInNewTabs.clear',
        );
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openSearchResultsInNewTabs.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openSearchResultsInNewTabs.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openSearchResultsInNewTabs.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openSearchResultsInNewTabs.onChange.hasListeners',
          );
        },
      },
    },
    openUrlbarResultsInNewTabs: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openUrlbarResultsInNewTabs.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.openUrlbarResultsInNewTabs.set');
      },
      clear: () => {
        throw new MockNotImplementedError(
          'Browser.browserSettings.openUrlbarResultsInNewTabs.clear',
        );
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openUrlbarResultsInNewTabs.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openUrlbarResultsInNewTabs.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openUrlbarResultsInNewTabs.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.openUrlbarResultsInNewTabs.onChange.hasListeners',
          );
        },
      },
    },
    webNotificationsDisabled: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.webNotificationsDisabled.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.webNotificationsDisabled.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.webNotificationsDisabled.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.webNotificationsDisabled.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.webNotificationsDisabled.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.webNotificationsDisabled.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.webNotificationsDisabled.onChange.hasListeners',
          );
        },
      },
    },
    overrideDocumentColors: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.overrideDocumentColors.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.overrideDocumentColors.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.overrideDocumentColors.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideDocumentColors.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideDocumentColors.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideDocumentColors.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideDocumentColors.onChange.hasListeners',
          );
        },
      },
    },
    overrideContentColorScheme: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.overrideContentColorScheme.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.overrideContentColorScheme.set');
      },
      clear: () => {
        throw new MockNotImplementedError(
          'Browser.browserSettings.overrideContentColorScheme.clear',
        );
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideContentColorScheme.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideContentColorScheme.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideContentColorScheme.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.overrideContentColorScheme.onChange.hasListeners',
          );
        },
      },
    },
    useDocumentFonts: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.useDocumentFonts.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.useDocumentFonts.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.useDocumentFonts.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.useDocumentFonts.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.useDocumentFonts.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.useDocumentFonts.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.useDocumentFonts.onChange.hasListeners',
          );
        },
      },
    },
    zoomFullPage: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.zoomFullPage.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.zoomFullPage.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.zoomFullPage.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomFullPage.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomFullPage.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomFullPage.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomFullPage.onChange.hasListeners',
          );
        },
      },
    },
    zoomSiteSpecific: {
      get: () => {
        throw new MockNotImplementedError('Browser.browserSettings.zoomSiteSpecific.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.browserSettings.zoomSiteSpecific.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.browserSettings.zoomSiteSpecific.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomSiteSpecific.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomSiteSpecific.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomSiteSpecific.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.zoomSiteSpecific.onChange.hasListeners',
          );
        },
      },
    },
    colorManagement: {
      mode: {
        get: () => {
          throw new MockNotImplementedError('Browser.browserSettings.colorManagement.mode.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.browserSettings.colorManagement.mode.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.browserSettings.colorManagement.mode.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.mode.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.mode.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.mode.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.mode.onChange.hasListeners',
            );
          },
        },
      },
      useNativeSRGB: {
        get: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.colorManagement.useNativeSRGB.get',
          );
        },
        set: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.colorManagement.useNativeSRGB.set',
          );
        },
        clear: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.colorManagement.useNativeSRGB.clear',
          );
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useNativeSRGB.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useNativeSRGB.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useNativeSRGB.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useNativeSRGB.onChange.hasListeners',
            );
          },
        },
      },
      useWebRenderCompositor: {
        get: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.colorManagement.useWebRenderCompositor.get',
          );
        },
        set: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.colorManagement.useWebRenderCompositor.set',
          );
        },
        clear: () => {
          throw new MockNotImplementedError(
            'Browser.browserSettings.colorManagement.useWebRenderCompositor.clear',
          );
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useWebRenderCompositor.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useWebRenderCompositor.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useWebRenderCompositor.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.browserSettings.colorManagement.useWebRenderCompositor.onChange.hasListeners',
            );
          },
        },
      },
    },
  },
  browsingData: {
    settings: () => {
      throw new MockNotImplementedError('Browser.browsingData.settings');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.browsingData.remove');
    },
    removeCache: () => {
      throw new MockNotImplementedError('Browser.browsingData.removeCache');
    },
    removeCookies: () => {
      throw new MockNotImplementedError('Browser.browsingData.removeCookies');
    },
    removeDownloads: () => {
      throw new MockNotImplementedError('Browser.browsingData.removeDownloads');
    },
    removeFormData: () => {
      throw new MockNotImplementedError('Browser.browsingData.removeFormData');
    },
    removeHistory: () => {
      throw new MockNotImplementedError('Browser.browsingData.removeHistory');
    },
    removeLocalStorage: () => {
      throw new MockNotImplementedError('Browser.browsingData.removeLocalStorage');
    },
    removePluginData: () => {
      throw new MockNotImplementedError('Browser.browsingData.removePluginData');
    },
    removePasswords: () => {
      throw new MockNotImplementedError('Browser.browsingData.removePasswords');
    },
  },
  captivePortal: {
    getState: () => {
      throw new MockNotImplementedError('Browser.captivePortal.getState');
    },
    getLastChecked: () => {
      throw new MockNotImplementedError('Browser.captivePortal.getLastChecked');
    },
    onStateChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.captivePortal.onStateChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.captivePortal.onStateChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.captivePortal.onStateChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.captivePortal.onStateChanged.hasListeners');
      },
    },
    onConnectivityAvailable: {
      addListener: () => {
        throw new MockNotImplementedError(
          'Browser.captivePortal.onConnectivityAvailable.addListener',
        );
      },
      removeListener: () => {
        throw new MockNotImplementedError(
          'Browser.captivePortal.onConnectivityAvailable.removeListener',
        );
      },
      hasListener: () => {
        throw new MockNotImplementedError(
          'Browser.captivePortal.onConnectivityAvailable.hasListener',
        );
      },
      hasListeners: () => {
        throw new MockNotImplementedError(
          'Browser.captivePortal.onConnectivityAvailable.hasListeners',
        );
      },
    },
    canonicalURL: {
      get: () => {
        throw new MockNotImplementedError('Browser.captivePortal.canonicalURL.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.captivePortal.canonicalURL.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.captivePortal.canonicalURL.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.captivePortal.canonicalURL.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.captivePortal.canonicalURL.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.captivePortal.canonicalURL.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.captivePortal.canonicalURL.onChange.hasListeners',
          );
        },
      },
    },
  },
  clipboard: {
    setImageData: () => {
      throw new MockNotImplementedError('Browser.clipboard.setImageData');
    },
  },
  commands: {
    update: () => {
      throw new MockNotImplementedError('Browser.commands.update');
    },
    reset: () => {
      throw new MockNotImplementedError('Browser.commands.reset');
    },
    getAll: () => {
      throw new MockNotImplementedError('Browser.commands.getAll');
    },
    onCommand: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.commands.onCommand.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.commands.onCommand.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.commands.onCommand.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.commands.onCommand.hasListeners');
      },
    },
    onChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.commands.onChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.commands.onChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.commands.onChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.commands.onChanged.hasListeners');
      },
    },
  },
  contentScripts: {
    register: () => {
      throw new MockNotImplementedError('Browser.contentScripts.register');
    },
  },
  contextualIdentities: {
    get: () => {
      throw new MockNotImplementedError('Browser.contextualIdentities.get');
    },
    query: () => {
      throw new MockNotImplementedError('Browser.contextualIdentities.query');
    },
    create: () => {
      throw new MockNotImplementedError('Browser.contextualIdentities.create');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.contextualIdentities.update');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.contextualIdentities.remove');
    },
    onUpdated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onUpdated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onUpdated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onUpdated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onUpdated.hasListeners');
      },
    },
    onCreated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onCreated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onCreated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onCreated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onCreated.hasListeners');
      },
    },
    onRemoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onRemoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onRemoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onRemoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.contextualIdentities.onRemoved.hasListeners');
      },
    },
  },
  cookies: {
    get: () => {
      throw new MockNotImplementedError('Browser.cookies.get');
    },
    getAll: () => {
      throw new MockNotImplementedError('Browser.cookies.getAll');
    },
    set: () => {
      throw new MockNotImplementedError('Browser.cookies.set');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.cookies.remove');
    },
    getAllCookieStores: () => {
      throw new MockNotImplementedError('Browser.cookies.getAllCookieStores');
    },
    onChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.cookies.onChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.cookies.onChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.cookies.onChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.cookies.onChanged.hasListeners');
      },
    },
  },
  declarativeNetRequest: {
    updateDynamicRules: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.updateDynamicRules');
    },
    updateSessionRules: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.updateSessionRules');
    },
    getEnabledRulesets: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.getEnabledRulesets');
    },
    updateEnabledRulesets: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.updateEnabledRulesets');
    },
    getAvailableStaticRuleCount: () => {
      throw new MockNotImplementedError(
        'Browser.declarativeNetRequest.getAvailableStaticRuleCount',
      );
    },
    getDynamicRules: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.getDynamicRules');
    },
    getSessionRules: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.getSessionRules');
    },
    isRegexSupported: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.isRegexSupported');
    },
    testMatchOutcome: () => {
      throw new MockNotImplementedError('Browser.declarativeNetRequest.testMatchOutcome');
    },
    DYNAMIC_RULESET_ID: '_dynamic',
    GUARANTEED_MINIMUM_STATIC_RULES: 0,
    MAX_NUMBER_OF_STATIC_RULESETS: 0,
    MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: 0,
    MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES: 0,
    MAX_NUMBER_OF_REGEX_RULES: 0,
    SESSION_RULESET_ID: '_session',
  },
  devtools: {
    inspectedWindow: {
      eval: () => {
        throw new MockNotImplementedError('Browser.devtools.inspectedWindow.eval');
      },
      reload: () => {
        throw new MockNotImplementedError('Browser.devtools.inspectedWindow.reload');
      },
      tabId: 0,
    },
    network: {
      getHAR: () => {
        throw new MockNotImplementedError('Browser.devtools.network.getHAR');
      },
      onRequestFinished: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.devtools.network.onRequestFinished.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.devtools.network.onRequestFinished.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.devtools.network.onRequestFinished.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.devtools.network.onRequestFinished.hasListeners',
          );
        },
      },
      onNavigated: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.devtools.network.onNavigated.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError('Browser.devtools.network.onNavigated.removeListener');
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.devtools.network.onNavigated.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.devtools.network.onNavigated.hasListeners');
        },
      },
    },
    panels: {
      create: () => {
        throw new MockNotImplementedError('Browser.devtools.panels.create');
      },
      onThemeChanged: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.devtools.panels.onThemeChanged.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.devtools.panels.onThemeChanged.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.devtools.panels.onThemeChanged.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.devtools.panels.onThemeChanged.hasListeners');
        },
      },
      elements: {
        createSidebarPane: () => {
          throw new MockNotImplementedError('Browser.devtools.panels.elements.createSidebarPane');
        },
        onSelectionChanged: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.devtools.panels.elements.onSelectionChanged.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.devtools.panels.elements.onSelectionChanged.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.devtools.panels.elements.onSelectionChanged.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.devtools.panels.elements.onSelectionChanged.hasListeners',
            );
          },
        },
      },
      sources: {},
      themeName: '',
    },
  },
  dns: {
    resolve: () => {
      throw new MockNotImplementedError('Browser.dns.resolve');
    },
  },
  downloads: {
    download: () => {
      throw new MockNotImplementedError('Browser.downloads.download');
    },
    search: () => {
      throw new MockNotImplementedError('Browser.downloads.search');
    },
    pause: () => {
      throw new MockNotImplementedError('Browser.downloads.pause');
    },
    resume: () => {
      throw new MockNotImplementedError('Browser.downloads.resume');
    },
    cancel: () => {
      throw new MockNotImplementedError('Browser.downloads.cancel');
    },
    getFileIcon: () => {
      throw new MockNotImplementedError('Browser.downloads.getFileIcon');
    },
    open: () => {
      throw new MockNotImplementedError('Browser.downloads.open');
    },
    show: () => {
      throw new MockNotImplementedError('Browser.downloads.show');
    },
    showDefaultFolder: () => {
      throw new MockNotImplementedError('Browser.downloads.showDefaultFolder');
    },
    erase: () => {
      throw new MockNotImplementedError('Browser.downloads.erase');
    },
    removeFile: () => {
      throw new MockNotImplementedError('Browser.downloads.removeFile');
    },
    onCreated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onCreated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onCreated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onCreated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.downloads.onCreated.hasListeners');
      },
    },
    onErased: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onErased.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onErased.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onErased.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.downloads.onErased.hasListeners');
      },
    },
    onChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.downloads.onChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.downloads.onChanged.hasListeners');
      },
    },
  },
  events: {},
  experiments: {},
  extension: {
    getViews: () => {
      throw new MockNotImplementedError('Browser.extension.getViews');
    },
    getBackgroundPage: () => {
      throw new MockNotImplementedError('Browser.extension.getBackgroundPage');
    },
    isAllowedIncognitoAccess: () => {
      throw new MockNotImplementedError('Browser.extension.isAllowedIncognitoAccess');
    },
    isAllowedFileSchemeAccess: () => {
      throw new MockNotImplementedError('Browser.extension.isAllowedFileSchemeAccess');
    },
    inIncognitoContext: false,
  },
  extensionTypes: {},
  find: {
    find: () => {
      throw new MockNotImplementedError('Browser.find.find');
    },
    highlightResults: () => {
      throw new MockNotImplementedError('Browser.find.highlightResults');
    },
    removeHighlighting: () => {
      throw new MockNotImplementedError('Browser.find.removeHighlighting');
    },
  },
  geckoProfiler: {
    start: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.start');
    },
    stop: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.stop');
    },
    pause: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.pause');
    },
    resume: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.resume');
    },
    dumpProfileToFile: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.dumpProfileToFile');
    },
    getProfile: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.getProfile');
    },
    getProfileAsArrayBuffer: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.getProfileAsArrayBuffer');
    },
    getProfileAsGzippedArrayBuffer: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.getProfileAsGzippedArrayBuffer');
    },
    getSymbols: () => {
      throw new MockNotImplementedError('Browser.geckoProfiler.getSymbols');
    },
    onRunning: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.geckoProfiler.onRunning.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.geckoProfiler.onRunning.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.geckoProfiler.onRunning.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.geckoProfiler.onRunning.hasListeners');
      },
    },
  },
  history: {
    search: () => {
      throw new MockNotImplementedError('Browser.history.search');
    },
    getVisits: () => {
      throw new MockNotImplementedError('Browser.history.getVisits');
    },
    addUrl: () => {
      throw new MockNotImplementedError('Browser.history.addUrl');
    },
    deleteUrl: () => {
      throw new MockNotImplementedError('Browser.history.deleteUrl');
    },
    deleteRange: () => {
      throw new MockNotImplementedError('Browser.history.deleteRange');
    },
    deleteAll: () => {
      throw new MockNotImplementedError('Browser.history.deleteAll');
    },
    onVisited: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.history.onVisited.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.history.onVisited.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.history.onVisited.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.history.onVisited.hasListeners');
      },
    },
    onVisitRemoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.history.onVisitRemoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.history.onVisitRemoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.history.onVisitRemoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.history.onVisitRemoved.hasListeners');
      },
    },
    onTitleChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.history.onTitleChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.history.onTitleChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.history.onTitleChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.history.onTitleChanged.hasListeners');
      },
    },
  },
  i18n: {
    getAcceptLanguages: () => {
      throw new MockNotImplementedError('Browser.i18n.getAcceptLanguages');
    },
    getMessage: () => {
      throw new MockNotImplementedError('Browser.i18n.getMessage');
    },
    getUILanguage: () => {
      throw new MockNotImplementedError('Browser.i18n.getUILanguage');
    },
    detectLanguage: () => {
      throw new MockNotImplementedError('Browser.i18n.detectLanguage');
    },
  },
  identity: {
    launchWebAuthFlow: () => {
      throw new MockNotImplementedError('Browser.identity.launchWebAuthFlow');
    },
    getRedirectURL: () => {
      throw new MockNotImplementedError('Browser.identity.getRedirectURL');
    },
  },
  idle: {
    queryState: () => {
      throw new MockNotImplementedError('Browser.idle.queryState');
    },
    setDetectionInterval: () => {
      throw new MockNotImplementedError('Browser.idle.setDetectionInterval');
    },
    onStateChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.idle.onStateChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.idle.onStateChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.idle.onStateChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.idle.onStateChanged.hasListeners');
      },
    },
  },
  management: {
    getAll: () => {
      throw new MockNotImplementedError('Browser.management.getAll');
    },
    get: () => {
      throw new MockNotImplementedError('Browser.management.get');
    },
    install: () => {
      throw new MockNotImplementedError('Browser.management.install');
    },
    getSelf: () => {
      throw new MockNotImplementedError('Browser.management.getSelf');
    },
    uninstallSelf: () => {
      throw new MockNotImplementedError('Browser.management.uninstallSelf');
    },
    setEnabled: () => {
      throw new MockNotImplementedError('Browser.management.setEnabled');
    },
    onDisabled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.management.onDisabled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.management.onDisabled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.management.onDisabled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.management.onDisabled.hasListeners');
      },
    },
    onEnabled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.management.onEnabled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.management.onEnabled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.management.onEnabled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.management.onEnabled.hasListeners');
      },
    },
    onInstalled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.management.onInstalled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.management.onInstalled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.management.onInstalled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.management.onInstalled.hasListeners');
      },
    },
    onUninstalled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.management.onUninstalled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.management.onUninstalled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.management.onUninstalled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.management.onUninstalled.hasListeners');
      },
    },
  },
  manifest: {},
  contextMenus: {
    create: () => {
      throw new MockNotImplementedError('Browser.contextMenus.create');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.contextMenus.update');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.contextMenus.remove');
    },
    removeAll: () => {
      throw new MockNotImplementedError('Browser.contextMenus.removeAll');
    },
    overrideContext: () => {
      throw new MockNotImplementedError('Browser.contextMenus.overrideContext');
    },
    refresh: () => {
      throw new MockNotImplementedError('Browser.contextMenus.refresh');
    },
    getTargetElement: () => {
      throw new MockNotImplementedError('Browser.contextMenus.getTargetElement');
    },
    onClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onClicked.hasListeners');
      },
    },
    onShown: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onShown.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onShown.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onShown.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onShown.hasListeners');
      },
    },
    onHidden: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onHidden.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onHidden.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onHidden.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.contextMenus.onHidden.hasListeners');
      },
    },
    ACTION_MENU_TOP_LEVEL_LIMIT: 6,
  },
  menus: {
    create: () => {
      throw new MockNotImplementedError('Browser.menus.create');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.menus.update');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.menus.remove');
    },
    removeAll: () => {
      throw new MockNotImplementedError('Browser.menus.removeAll');
    },
    overrideContext: () => {
      throw new MockNotImplementedError('Browser.menus.overrideContext');
    },
    refresh: () => {
      throw new MockNotImplementedError('Browser.menus.refresh');
    },
    getTargetElement: () => {
      throw new MockNotImplementedError('Browser.menus.getTargetElement');
    },
    onClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.menus.onClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.menus.onClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.menus.onClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.menus.onClicked.hasListeners');
      },
    },
    onShown: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.menus.onShown.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.menus.onShown.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.menus.onShown.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.menus.onShown.hasListeners');
      },
    },
    onHidden: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.menus.onHidden.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.menus.onHidden.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.menus.onHidden.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.menus.onHidden.hasListeners');
      },
    },
    ACTION_MENU_TOP_LEVEL_LIMIT: 6,
  },
  networkStatus: {
    getLinkInfo: () => {
      throw new MockNotImplementedError('Browser.networkStatus.getLinkInfo');
    },
    onConnectionChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.networkStatus.onConnectionChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError(
          'Browser.networkStatus.onConnectionChanged.removeListener',
        );
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.networkStatus.onConnectionChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.networkStatus.onConnectionChanged.hasListeners');
      },
    },
  },
  normandyAddonStudy: {
    getStudy: () => {
      throw new MockNotImplementedError('Browser.normandyAddonStudy.getStudy');
    },
    endStudy: () => {
      throw new MockNotImplementedError('Browser.normandyAddonStudy.endStudy');
    },
    getClientMetadata: () => {
      throw new MockNotImplementedError('Browser.normandyAddonStudy.getClientMetadata');
    },
    onUnenroll: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.normandyAddonStudy.onUnenroll.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.normandyAddonStudy.onUnenroll.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.normandyAddonStudy.onUnenroll.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.normandyAddonStudy.onUnenroll.hasListeners');
      },
    },
  },
  notifications: {
    create: () => {
      throw new MockNotImplementedError('Browser.notifications.create');
    },
    clear: () => {
      throw new MockNotImplementedError('Browser.notifications.clear');
    },
    getAll: () => {
      throw new MockNotImplementedError('Browser.notifications.getAll');
    },
    onClosed: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onClosed.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onClosed.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onClosed.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.notifications.onClosed.hasListeners');
      },
    },
    onClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.notifications.onClicked.hasListeners');
      },
    },
    onButtonClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onButtonClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onButtonClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onButtonClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.notifications.onButtonClicked.hasListeners');
      },
    },
    onShown: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onShown.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onShown.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.notifications.onShown.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.notifications.onShown.hasListeners');
      },
    },
  },
  omnibox: {
    setDefaultSuggestion: () => {
      throw new MockNotImplementedError('Browser.omnibox.setDefaultSuggestion');
    },
    onInputStarted: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputStarted.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputStarted.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputStarted.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputStarted.hasListeners');
      },
    },
    onInputChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputChanged.hasListeners');
      },
    },
    onInputEntered: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputEntered.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputEntered.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputEntered.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputEntered.hasListeners');
      },
    },
    onInputCancelled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputCancelled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputCancelled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputCancelled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.omnibox.onInputCancelled.hasListeners');
      },
    },
    onDeleteSuggestion: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onDeleteSuggestion.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onDeleteSuggestion.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.omnibox.onDeleteSuggestion.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.omnibox.onDeleteSuggestion.hasListeners');
      },
    },
  },
  pageAction: {
    show: () => {
      throw new MockNotImplementedError('Browser.pageAction.show');
    },
    hide: () => {
      throw new MockNotImplementedError('Browser.pageAction.hide');
    },
    isShown: () => {
      throw new MockNotImplementedError('Browser.pageAction.isShown');
    },
    setTitle: () => {
      throw new MockNotImplementedError('Browser.pageAction.setTitle');
    },
    getTitle: () => {
      throw new MockNotImplementedError('Browser.pageAction.getTitle');
    },
    setIcon: () => {
      throw new MockNotImplementedError('Browser.pageAction.setIcon');
    },
    setPopup: () => {
      throw new MockNotImplementedError('Browser.pageAction.setPopup');
    },
    getPopup: () => {
      throw new MockNotImplementedError('Browser.pageAction.getPopup');
    },
    openPopup: () => {
      throw new MockNotImplementedError('Browser.pageAction.openPopup');
    },
    onClicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.pageAction.onClicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.pageAction.onClicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.pageAction.onClicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.pageAction.onClicked.hasListeners');
      },
    },
  },
  permissions: {
    getAll: () => {
      throw new MockNotImplementedError('Browser.permissions.getAll');
    },
    contains: () => {
      throw new MockNotImplementedError('Browser.permissions.contains');
    },
    request: () => {
      throw new MockNotImplementedError('Browser.permissions.request');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.permissions.remove');
    },
    onAdded: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.permissions.onAdded.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.permissions.onAdded.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.permissions.onAdded.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.permissions.onAdded.hasListeners');
      },
    },
    onRemoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.permissions.onRemoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.permissions.onRemoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.permissions.onRemoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.permissions.onRemoved.hasListeners');
      },
    },
  },
  pkcs11: {
    isModuleInstalled: () => {
      throw new MockNotImplementedError('Browser.pkcs11.isModuleInstalled');
    },
    installModule: () => {
      throw new MockNotImplementedError('Browser.pkcs11.installModule');
    },
    uninstallModule: () => {
      throw new MockNotImplementedError('Browser.pkcs11.uninstallModule');
    },
    getModuleSlots: () => {
      throw new MockNotImplementedError('Browser.pkcs11.getModuleSlots');
    },
  },
  privacy: {
    network: {
      networkPredictionEnabled: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.network.networkPredictionEnabled.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.network.networkPredictionEnabled.set');
        },
        clear: () => {
          throw new MockNotImplementedError(
            'Browser.privacy.network.networkPredictionEnabled.clear',
          );
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.networkPredictionEnabled.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.networkPredictionEnabled.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.networkPredictionEnabled.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.networkPredictionEnabled.onChange.hasListeners',
            );
          },
        },
      },
      peerConnectionEnabled: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.network.peerConnectionEnabled.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.network.peerConnectionEnabled.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.network.peerConnectionEnabled.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.peerConnectionEnabled.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.peerConnectionEnabled.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.peerConnectionEnabled.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.peerConnectionEnabled.onChange.hasListeners',
            );
          },
        },
      },
      webRTCIPHandlingPolicy: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.network.webRTCIPHandlingPolicy.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.network.webRTCIPHandlingPolicy.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.network.webRTCIPHandlingPolicy.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.webRTCIPHandlingPolicy.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.webRTCIPHandlingPolicy.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.webRTCIPHandlingPolicy.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.webRTCIPHandlingPolicy.onChange.hasListeners',
            );
          },
        },
      },
      tlsVersionRestriction: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.network.tlsVersionRestriction.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.network.tlsVersionRestriction.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.network.tlsVersionRestriction.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.tlsVersionRestriction.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.tlsVersionRestriction.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.tlsVersionRestriction.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.tlsVersionRestriction.onChange.hasListeners',
            );
          },
        },
      },
      httpsOnlyMode: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.network.httpsOnlyMode.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.network.httpsOnlyMode.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.network.httpsOnlyMode.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.httpsOnlyMode.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.httpsOnlyMode.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.httpsOnlyMode.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.httpsOnlyMode.onChange.hasListeners',
            );
          },
        },
      },
      globalPrivacyControl: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.network.globalPrivacyControl.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.network.globalPrivacyControl.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.network.globalPrivacyControl.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.globalPrivacyControl.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.globalPrivacyControl.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.globalPrivacyControl.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.network.globalPrivacyControl.onChange.hasListeners',
            );
          },
        },
      },
    },
    services: {
      passwordSavingEnabled: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.services.passwordSavingEnabled.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.services.passwordSavingEnabled.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.services.passwordSavingEnabled.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.services.passwordSavingEnabled.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.services.passwordSavingEnabled.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.services.passwordSavingEnabled.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.services.passwordSavingEnabled.onChange.hasListeners',
            );
          },
        },
      },
    },
    websites: {
      hyperlinkAuditingEnabled: {
        get: () => {
          throw new MockNotImplementedError(
            'Browser.privacy.websites.hyperlinkAuditingEnabled.get',
          );
        },
        set: () => {
          throw new MockNotImplementedError(
            'Browser.privacy.websites.hyperlinkAuditingEnabled.set',
          );
        },
        clear: () => {
          throw new MockNotImplementedError(
            'Browser.privacy.websites.hyperlinkAuditingEnabled.clear',
          );
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.hyperlinkAuditingEnabled.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.hyperlinkAuditingEnabled.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.hyperlinkAuditingEnabled.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.hyperlinkAuditingEnabled.onChange.hasListeners',
            );
          },
        },
      },
      referrersEnabled: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.referrersEnabled.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.referrersEnabled.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.referrersEnabled.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.referrersEnabled.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.referrersEnabled.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.referrersEnabled.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.referrersEnabled.onChange.hasListeners',
            );
          },
        },
      },
      resistFingerprinting: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.resistFingerprinting.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.resistFingerprinting.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.resistFingerprinting.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.resistFingerprinting.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.resistFingerprinting.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.resistFingerprinting.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.resistFingerprinting.onChange.hasListeners',
            );
          },
        },
      },
      firstPartyIsolate: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.firstPartyIsolate.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.firstPartyIsolate.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.firstPartyIsolate.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.firstPartyIsolate.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.firstPartyIsolate.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.firstPartyIsolate.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.firstPartyIsolate.onChange.hasListeners',
            );
          },
        },
      },
      trackingProtectionMode: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.trackingProtectionMode.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.trackingProtectionMode.set');
        },
        clear: () => {
          throw new MockNotImplementedError(
            'Browser.privacy.websites.trackingProtectionMode.clear',
          );
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.trackingProtectionMode.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.trackingProtectionMode.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.trackingProtectionMode.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.trackingProtectionMode.onChange.hasListeners',
            );
          },
        },
      },
      cookieConfig: {
        get: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.cookieConfig.get');
        },
        set: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.cookieConfig.set');
        },
        clear: () => {
          throw new MockNotImplementedError('Browser.privacy.websites.cookieConfig.clear');
        },
        onChange: {
          addListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.cookieConfig.onChange.addListener',
            );
          },
          removeListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.cookieConfig.onChange.removeListener',
            );
          },
          hasListener: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.cookieConfig.onChange.hasListener',
            );
          },
          hasListeners: () => {
            throw new MockNotImplementedError(
              'Browser.privacy.websites.cookieConfig.onChange.hasListeners',
            );
          },
        },
      },
    },
  },
  proxy: {
    onRequest: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.proxy.onRequest.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.proxy.onRequest.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.proxy.onRequest.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.proxy.onRequest.hasListeners');
      },
    },
    onError: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.proxy.onError.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.proxy.onError.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.proxy.onError.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.proxy.onError.hasListeners');
      },
    },
    settings: {
      get: () => {
        throw new MockNotImplementedError('Browser.proxy.settings.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.proxy.settings.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.proxy.settings.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.proxy.settings.onChange.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError('Browser.proxy.settings.onChange.removeListener');
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.proxy.settings.onChange.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.proxy.settings.onChange.hasListeners');
        },
      },
    },
  },
  runtime: {
    getBackgroundPage: () => {
      throw new MockNotImplementedError('Browser.runtime.getBackgroundPage');
    },
    openOptionsPage: () => {
      throw new MockNotImplementedError('Browser.runtime.openOptionsPage');
    },
    getManifest: () => {
      throw new MockNotImplementedError('Browser.runtime.getManifest');
    },
    getURL: () => {
      throw new MockNotImplementedError('Browser.runtime.getURL');
    },
    getFrameId: () => {
      throw new MockNotImplementedError('Browser.runtime.getFrameId');
    },
    setUninstallURL: () => {
      throw new MockNotImplementedError('Browser.runtime.setUninstallURL');
    },
    reload: () => {
      throw new MockNotImplementedError('Browser.runtime.reload');
    },
    requestUpdateCheck: () => {
      throw new MockNotImplementedError('Browser.runtime.requestUpdateCheck');
    },
    connect: () => {
      throw new MockNotImplementedError('Browser.runtime.connect');
    },
    connectNative: () => {
      throw new MockNotImplementedError('Browser.runtime.connectNative');
    },
    sendMessage: () => {
      throw new MockNotImplementedError('Browser.runtime.sendMessage');
    },
    sendNativeMessage: () => {
      throw new MockNotImplementedError('Browser.runtime.sendNativeMessage');
    },
    getBrowserInfo: () => {
      throw new MockNotImplementedError('Browser.runtime.getBrowserInfo');
    },
    getPlatformInfo: () => {
      throw new MockNotImplementedError('Browser.runtime.getPlatformInfo');
    },
    onStartup: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onStartup.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onStartup.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onStartup.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onStartup.hasListeners');
      },
    },
    onInstalled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onInstalled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onInstalled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onInstalled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onInstalled.hasListeners');
      },
    },
    onSuspend: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspend.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspend.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspend.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspend.hasListeners');
      },
    },
    onSuspendCanceled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspendCanceled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspendCanceled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspendCanceled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onSuspendCanceled.hasListeners');
      },
    },
    onUpdateAvailable: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onUpdateAvailable.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onUpdateAvailable.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onUpdateAvailable.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onUpdateAvailable.hasListeners');
      },
    },
    onConnect: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnect.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnect.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnect.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnect.hasListeners');
      },
    },
    onConnectExternal: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnectExternal.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnectExternal.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnectExternal.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onConnectExternal.hasListeners');
      },
    },
    onMessage: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessage.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessage.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessage.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessage.hasListeners');
      },
    },
    onMessageExternal: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessageExternal.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessageExternal.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessageExternal.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.runtime.onMessageExternal.hasListeners');
      },
    },
    lastError: {
      message: '',
    },
    id: '',
  },
  scripting: {
    executeScript: () => {
      throw new MockNotImplementedError('Browser.scripting.executeScript');
    },
    insertCSS: () => {
      throw new MockNotImplementedError('Browser.scripting.insertCSS');
    },
    removeCSS: () => {
      throw new MockNotImplementedError('Browser.scripting.removeCSS');
    },
    registerContentScripts: () => {
      throw new MockNotImplementedError('Browser.scripting.registerContentScripts');
    },
    getRegisteredContentScripts: () => {
      throw new MockNotImplementedError('Browser.scripting.getRegisteredContentScripts');
    },
    unregisterContentScripts: () => {
      throw new MockNotImplementedError('Browser.scripting.unregisterContentScripts');
    },
    updateContentScripts: () => {
      throw new MockNotImplementedError('Browser.scripting.updateContentScripts');
    },
  },
  search: {
    get: () => {
      throw new MockNotImplementedError('Browser.search.get');
    },
    search: () => {
      throw new MockNotImplementedError('Browser.search.search');
    },
    query: () => {
      throw new MockNotImplementedError('Browser.search.query');
    },
  },
  sessions: {
    forgetClosedTab: () => {
      throw new MockNotImplementedError('Browser.sessions.forgetClosedTab');
    },
    forgetClosedWindow: () => {
      throw new MockNotImplementedError('Browser.sessions.forgetClosedWindow');
    },
    getRecentlyClosed: () => {
      throw new MockNotImplementedError('Browser.sessions.getRecentlyClosed');
    },
    restore: () => {
      throw new MockNotImplementedError('Browser.sessions.restore');
    },
    setTabValue: () => {
      throw new MockNotImplementedError('Browser.sessions.setTabValue');
    },
    getTabValue: () => {
      throw new MockNotImplementedError('Browser.sessions.getTabValue');
    },
    removeTabValue: () => {
      throw new MockNotImplementedError('Browser.sessions.removeTabValue');
    },
    setWindowValue: () => {
      throw new MockNotImplementedError('Browser.sessions.setWindowValue');
    },
    getWindowValue: () => {
      throw new MockNotImplementedError('Browser.sessions.getWindowValue');
    },
    removeWindowValue: () => {
      throw new MockNotImplementedError('Browser.sessions.removeWindowValue');
    },
    onChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.sessions.onChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.sessions.onChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.sessions.onChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.sessions.onChanged.hasListeners');
      },
    },
    MAX_SESSION_RESULTS: 25,
  },
  sidebarAction: {
    setTitle: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.setTitle');
    },
    getTitle: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.getTitle');
    },
    setIcon: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.setIcon');
    },
    setPanel: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.setPanel');
    },
    getPanel: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.getPanel');
    },
    open: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.open');
    },
    close: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.close');
    },
    toggle: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.toggle');
    },
    isOpen: () => {
      throw new MockNotImplementedError('Browser.sidebarAction.isOpen');
    },
  },
  storage: {
    onChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.storage.onChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.storage.onChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.storage.onChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.storage.onChanged.hasListeners');
      },
    },
    sync: {
      QUOTA_BYTES: 102400,
      QUOTA_BYTES_PER_ITEM: 8192,
      MAX_ITEMS: 512,
      MAX_WRITE_OPERATIONS_PER_HOUR: 1800,
      MAX_WRITE_OPERATIONS_PER_MINUTE: 120,
      get: () => {
        throw new MockNotImplementedError('Browser.storage.sync.get');
      },
      getBytesInUse: () => {
        throw new MockNotImplementedError('Browser.storage.sync.getBytesInUse');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.storage.sync.set');
      },
      remove: () => {
        throw new MockNotImplementedError('Browser.storage.sync.remove');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.storage.sync.clear');
      },
      onChanged: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.storage.sync.onChanged.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError('Browser.storage.sync.onChanged.removeListener');
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.storage.sync.onChanged.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.storage.sync.onChanged.hasListeners');
        },
      },
    },
    local: {
      QUOTA_BYTES: 5242880,
      get: () => {
        throw new MockNotImplementedError('Browser.storage.local.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.storage.local.set');
      },
      remove: () => {
        throw new MockNotImplementedError('Browser.storage.local.remove');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.storage.local.clear');
      },
      onChanged: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.storage.local.onChanged.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError('Browser.storage.local.onChanged.removeListener');
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.storage.local.onChanged.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.storage.local.onChanged.hasListeners');
        },
      },
    },
    managed: {
      QUOTA_BYTES: 5242880,
      get: () => {
        throw new MockNotImplementedError('Browser.storage.managed.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.storage.managed.set');
      },
      remove: () => {
        throw new MockNotImplementedError('Browser.storage.managed.remove');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.storage.managed.clear');
      },
      onChanged: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.storage.managed.onChanged.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError('Browser.storage.managed.onChanged.removeListener');
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.storage.managed.onChanged.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.storage.managed.onChanged.hasListeners');
        },
      },
    },
    session: {
      get: () => {
        throw new MockNotImplementedError('Browser.storage.session.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.storage.session.set');
      },
      remove: () => {
        throw new MockNotImplementedError('Browser.storage.session.remove');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.storage.session.clear');
      },
      onChanged: {
        addListener: () => {
          throw new MockNotImplementedError('Browser.storage.session.onChanged.addListener');
        },
        removeListener: () => {
          throw new MockNotImplementedError('Browser.storage.session.onChanged.removeListener');
        },
        hasListener: () => {
          throw new MockNotImplementedError('Browser.storage.session.onChanged.hasListener');
        },
        hasListeners: () => {
          throw new MockNotImplementedError('Browser.storage.session.onChanged.hasListeners');
        },
      },
    },
  },
  tabs: {
    get: () => {
      throw new MockNotImplementedError('Browser.tabs.get');
    },
    getCurrent: () => {
      throw new MockNotImplementedError('Browser.tabs.getCurrent');
    },
    connect: () => {
      throw new MockNotImplementedError('Browser.tabs.connect');
    },
    sendMessage: () => {
      throw new MockNotImplementedError('Browser.tabs.sendMessage');
    },
    create: () => {
      throw new MockNotImplementedError('Browser.tabs.create');
    },
    duplicate: () => {
      throw new MockNotImplementedError('Browser.tabs.duplicate');
    },
    query: () => {
      throw new MockNotImplementedError('Browser.tabs.query');
    },
    highlight: () => {
      throw new MockNotImplementedError('Browser.tabs.highlight');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.tabs.update');
    },
    move: () => {
      throw new MockNotImplementedError('Browser.tabs.move');
    },
    reload: () => {
      throw new MockNotImplementedError('Browser.tabs.reload');
    },
    warmup: () => {
      throw new MockNotImplementedError('Browser.tabs.warmup');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.tabs.remove');
    },
    discard: () => {
      throw new MockNotImplementedError('Browser.tabs.discard');
    },
    detectLanguage: () => {
      throw new MockNotImplementedError('Browser.tabs.detectLanguage');
    },
    toggleReaderMode: () => {
      throw new MockNotImplementedError('Browser.tabs.toggleReaderMode');
    },
    captureTab: () => {
      throw new MockNotImplementedError('Browser.tabs.captureTab');
    },
    captureVisibleTab: () => {
      throw new MockNotImplementedError('Browser.tabs.captureVisibleTab');
    },
    executeScript: () => {
      throw new MockNotImplementedError('Browser.tabs.executeScript');
    },
    insertCSS: () => {
      throw new MockNotImplementedError('Browser.tabs.insertCSS');
    },
    removeCSS: () => {
      throw new MockNotImplementedError('Browser.tabs.removeCSS');
    },
    setZoom: () => {
      throw new MockNotImplementedError('Browser.tabs.setZoom');
    },
    getZoom: () => {
      throw new MockNotImplementedError('Browser.tabs.getZoom');
    },
    setZoomSettings: () => {
      throw new MockNotImplementedError('Browser.tabs.setZoomSettings');
    },
    getZoomSettings: () => {
      throw new MockNotImplementedError('Browser.tabs.getZoomSettings');
    },
    print: () => {
      throw new MockNotImplementedError('Browser.tabs.print');
    },
    printPreview: () => {
      throw new MockNotImplementedError('Browser.tabs.printPreview');
    },
    saveAsPDF: () => {
      throw new MockNotImplementedError('Browser.tabs.saveAsPDF');
    },
    show: () => {
      throw new MockNotImplementedError('Browser.tabs.show');
    },
    hide: () => {
      throw new MockNotImplementedError('Browser.tabs.hide');
    },
    moveInSuccession: () => {
      throw new MockNotImplementedError('Browser.tabs.moveInSuccession');
    },
    goForward: () => {
      throw new MockNotImplementedError('Browser.tabs.goForward');
    },
    goBack: () => {
      throw new MockNotImplementedError('Browser.tabs.goBack');
    },
    onCreated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onCreated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onCreated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onCreated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onCreated.hasListeners');
      },
    },
    onUpdated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onUpdated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onUpdated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onUpdated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onUpdated.hasListeners');
      },
    },
    onMoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onMoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onMoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onMoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onMoved.hasListeners');
      },
    },
    onActivated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onActivated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onActivated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onActivated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onActivated.hasListeners');
      },
    },
    onHighlighted: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onHighlighted.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onHighlighted.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onHighlighted.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onHighlighted.hasListeners');
      },
    },
    onDetached: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onDetached.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onDetached.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onDetached.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onDetached.hasListeners');
      },
    },
    onAttached: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onAttached.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onAttached.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onAttached.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onAttached.hasListeners');
      },
    },
    onRemoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onRemoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onRemoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onRemoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onRemoved.hasListeners');
      },
    },
    onReplaced: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onReplaced.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onReplaced.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onReplaced.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onReplaced.hasListeners');
      },
    },
    onZoomChange: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onZoomChange.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onZoomChange.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.tabs.onZoomChange.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.tabs.onZoomChange.hasListeners');
      },
    },
    TAB_ID_NONE: -1,
  },
  theme: {
    getCurrent: () => {
      throw new MockNotImplementedError('Browser.theme.getCurrent');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.theme.update');
    },
    reset: () => {
      throw new MockNotImplementedError('Browser.theme.reset');
    },
    onUpdated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.theme.onUpdated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.theme.onUpdated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.theme.onUpdated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.theme.onUpdated.hasListeners');
      },
    },
  },
  topSites: {
    get: () => {
      throw new MockNotImplementedError('Browser.topSites.get');
    },
  },
  types: {},
  urlbar: {
    closeView: () => {
      throw new MockNotImplementedError('Browser.urlbar.closeView');
    },
    focus: () => {
      throw new MockNotImplementedError('Browser.urlbar.focus');
    },
    search: () => {
      throw new MockNotImplementedError('Browser.urlbar.search');
    },
    onBehaviorRequested: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onBehaviorRequested.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onBehaviorRequested.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onBehaviorRequested.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.urlbar.onBehaviorRequested.hasListeners');
      },
    },
    onEngagement: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onEngagement.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onEngagement.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onEngagement.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.urlbar.onEngagement.hasListeners');
      },
    },
    onQueryCanceled: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onQueryCanceled.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onQueryCanceled.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onQueryCanceled.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.urlbar.onQueryCanceled.hasListeners');
      },
    },
    onResultsRequested: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultsRequested.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultsRequested.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultsRequested.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultsRequested.hasListeners');
      },
    },
    onResultPicked: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultPicked.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultPicked.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultPicked.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.urlbar.onResultPicked.hasListeners');
      },
    },
    engagementTelemetry: {
      get: () => {
        throw new MockNotImplementedError('Browser.urlbar.engagementTelemetry.get');
      },
      set: () => {
        throw new MockNotImplementedError('Browser.urlbar.engagementTelemetry.set');
      },
      clear: () => {
        throw new MockNotImplementedError('Browser.urlbar.engagementTelemetry.clear');
      },
      onChange: {
        addListener: () => {
          throw new MockNotImplementedError(
            'Browser.urlbar.engagementTelemetry.onChange.addListener',
          );
        },
        removeListener: () => {
          throw new MockNotImplementedError(
            'Browser.urlbar.engagementTelemetry.onChange.removeListener',
          );
        },
        hasListener: () => {
          throw new MockNotImplementedError(
            'Browser.urlbar.engagementTelemetry.onChange.hasListener',
          );
        },
        hasListeners: () => {
          throw new MockNotImplementedError(
            'Browser.urlbar.engagementTelemetry.onChange.hasListeners',
          );
        },
      },
    },
  },
  userScripts: {
    register: () => {
      throw new MockNotImplementedError('Browser.userScripts.register');
    },
  },
  webNavigation: {
    getFrame: () => {
      throw new MockNotImplementedError('Browser.webNavigation.getFrame');
    },
    getAllFrames: () => {
      throw new MockNotImplementedError('Browser.webNavigation.getAllFrames');
    },
    onBeforeNavigate: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onBeforeNavigate.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onBeforeNavigate.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onBeforeNavigate.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onBeforeNavigate.hasListeners');
      },
    },
    onCommitted: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCommitted.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCommitted.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCommitted.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCommitted.hasListeners');
      },
    },
    onDOMContentLoaded: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onDOMContentLoaded.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onDOMContentLoaded.removeListener',
        );
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onDOMContentLoaded.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onDOMContentLoaded.hasListeners');
      },
    },
    onCompleted: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCompleted.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCompleted.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCompleted.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onCompleted.hasListeners');
      },
    },
    onErrorOccurred: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onErrorOccurred.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onErrorOccurred.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onErrorOccurred.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onErrorOccurred.hasListeners');
      },
    },
    onCreatedNavigationTarget: {
      addListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onCreatedNavigationTarget.addListener',
        );
      },
      removeListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onCreatedNavigationTarget.removeListener',
        );
      },
      hasListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onCreatedNavigationTarget.hasListener',
        );
      },
      hasListeners: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onCreatedNavigationTarget.hasListeners',
        );
      },
    },
    onReferenceFragmentUpdated: {
      addListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onReferenceFragmentUpdated.addListener',
        );
      },
      removeListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onReferenceFragmentUpdated.removeListener',
        );
      },
      hasListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onReferenceFragmentUpdated.hasListener',
        );
      },
      hasListeners: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onReferenceFragmentUpdated.hasListeners',
        );
      },
    },
    onTabReplaced: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onTabReplaced.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onTabReplaced.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onTabReplaced.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webNavigation.onTabReplaced.hasListeners');
      },
    },
    onHistoryStateUpdated: {
      addListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onHistoryStateUpdated.addListener',
        );
      },
      removeListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onHistoryStateUpdated.removeListener',
        );
      },
      hasListener: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onHistoryStateUpdated.hasListener',
        );
      },
      hasListeners: () => {
        throw new MockNotImplementedError(
          'Browser.webNavigation.onHistoryStateUpdated.hasListeners',
        );
      },
    },
  },
  webRequest: {
    handlerBehaviorChanged: () => {
      throw new MockNotImplementedError('Browser.webRequest.handlerBehaviorChanged');
    },
    filterResponseData: () => {
      throw new MockNotImplementedError('Browser.webRequest.filterResponseData');
    },
    getSecurityInfo: () => {
      throw new MockNotImplementedError('Browser.webRequest.getSecurityInfo');
    },
    onBeforeRequest: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRequest.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRequest.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRequest.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRequest.hasListeners');
      },
    },
    onBeforeSendHeaders: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeSendHeaders.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeSendHeaders.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeSendHeaders.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeSendHeaders.hasListeners');
      },
    },
    onSendHeaders: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onSendHeaders.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onSendHeaders.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onSendHeaders.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onSendHeaders.hasListeners');
      },
    },
    onHeadersReceived: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onHeadersReceived.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onHeadersReceived.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onHeadersReceived.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onHeadersReceived.hasListeners');
      },
    },
    onAuthRequired: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onAuthRequired.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onAuthRequired.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onAuthRequired.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onAuthRequired.hasListeners');
      },
    },
    onResponseStarted: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onResponseStarted.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onResponseStarted.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onResponseStarted.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onResponseStarted.hasListeners');
      },
    },
    onBeforeRedirect: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRedirect.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRedirect.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRedirect.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onBeforeRedirect.hasListeners');
      },
    },
    onCompleted: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onCompleted.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onCompleted.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onCompleted.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onCompleted.hasListeners');
      },
    },
    onErrorOccurred: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onErrorOccurred.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onErrorOccurred.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.webRequest.onErrorOccurred.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.webRequest.onErrorOccurred.hasListeners');
      },
    },
    MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: 20,
  },
  windows: {
    get: () => {
      throw new MockNotImplementedError('Browser.windows.get');
    },
    getCurrent: () => {
      throw new MockNotImplementedError('Browser.windows.getCurrent');
    },
    getLastFocused: () => {
      throw new MockNotImplementedError('Browser.windows.getLastFocused');
    },
    getAll: () => {
      throw new MockNotImplementedError('Browser.windows.getAll');
    },
    create: () => {
      throw new MockNotImplementedError('Browser.windows.create');
    },
    update: () => {
      throw new MockNotImplementedError('Browser.windows.update');
    },
    remove: () => {
      throw new MockNotImplementedError('Browser.windows.remove');
    },
    onCreated: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.windows.onCreated.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.windows.onCreated.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.windows.onCreated.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.windows.onCreated.hasListeners');
      },
    },
    onRemoved: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.windows.onRemoved.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.windows.onRemoved.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.windows.onRemoved.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.windows.onRemoved.hasListeners');
      },
    },
    onFocusChanged: {
      addListener: () => {
        throw new MockNotImplementedError('Browser.windows.onFocusChanged.addListener');
      },
      removeListener: () => {
        throw new MockNotImplementedError('Browser.windows.onFocusChanged.removeListener');
      },
      hasListener: () => {
        throw new MockNotImplementedError('Browser.windows.onFocusChanged.hasListener');
      },
      hasListeners: () => {
        throw new MockNotImplementedError('Browser.windows.onFocusChanged.hasListeners');
      },
    },
    WINDOW_ID_NONE: -1,
    WINDOW_ID_CURRENT: -2,
  },
};
