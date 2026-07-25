import { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { Callback, callbackOrUndefined, promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';
import { windows, DEFAULT_WINDOW } from './windows';

type InMemoryTab = Omit<Browser.tabs.Tab, 'active'>;

const onActivated = defineEventWithTrigger<(activeInfo: Browser.tabs.OnActivatedInfo) => void>();
const onCreated = defineEventWithTrigger<(tab: Browser.tabs.Tab) => void>();
const onUpdated =
  defineEventWithTrigger<
    (tabId: number, changeInfo: Browser.tabs.OnUpdatedInfo, tab: Browser.tabs.Tab) => void
  >();

const onHighlighted =
  defineEventWithTrigger<(highlightInfo: Browser.tabs.OnHighlightedInfo) => void>();
const onRemoved =
  defineEventWithTrigger<(tabId: number, removeInfo: Browser.tabs.OnRemovedInfo) => void>();

const DEFAULT_TAB: InMemoryTab = {
  id: 0,
  index: 0,
  highlighted: false,
  incognito: false,
  pinned: false,
  windowId: DEFAULT_WINDOW.id!,
  autoDiscardable: false,
  discarded: false,
  frozen: false,
  groupId: 0,
  selected: false,
};
const DEFAULT_NEXT_TAB_ID = 1;

export const tabList: InMemoryTab[] = [DEFAULT_TAB];
export let activeTabId: Browser.tabs.Tab['id'];
let nextTabId = DEFAULT_NEXT_TAB_ID;

function setActiveTabId(id: Browser.tabs.Tab['id']): void {
  activeTabId = id;
}
function getNextTabId(): Browser.tabs.Tab['id'] {
  const id = nextTabId;
  nextTabId++;
  return id;
}

export function mapTab(tab: InMemoryTab): Browser.tabs.Tab {
  return {
    ...tab,
    active: activeTabId === tab.id,
  };
}

export const tabs: BrowserOverrides['tabs'] = {
  resetState() {
    tabList.length = 1;
    tabList[0] = DEFAULT_TAB;
    activeTabId = undefined;
    nextTabId = DEFAULT_NEXT_TAB_ID;
    onActivated.removeAllListeners();
    onCreated.removeAllListeners();
    onUpdated.removeAllListeners();
    onHighlighted.removeAllListeners();
    onRemoved.removeAllListeners();
  },
  get(tabId, arg2?) {
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, () => {
      const tab = tabList.find((tab) => tab.id === tabId);
      if (!tab) return undefined!;
      return mapTab(tab);
    });
  },
  getCurrent(arg1?) {
    const callback = callbackOrUndefined(arg1);

    return promiseOrCallback(callback, () => {
      if (activeTabId == null) return undefined!;
      return tabs.get(activeTabId);
    });
  },
  create(createProperties, arg2?) {
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, async () => {
      const window = createProperties.windowId
        ? await windows.get(createProperties.windowId, { populate: true })
        : await windows.getCurrent({ populate: true });
      const newTab: InMemoryTab = {
        ...DEFAULT_TAB,
        index: window?.tabs?.length ?? 0,
        pinned: createProperties.pinned ?? false,
        windowId: window?.id ?? 0,
        id: getNextTabId(),
        url: createProperties.url,
      };
      tabList.push(newTab);
      const fullTab = mapTab(newTab);
      await onCreated.trigger(fullTab);

      return fullTab;
    });
  },
  duplicate(tabId, arg2?) {
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, async () => {
      const tab = await tabs.get(tabId);
      const newTab: InMemoryTab = {
        ...tab,
        id: getNextTabId(),
      };
      const fullTab = mapTab(newTab);
      await onCreated.trigger(fullTab);

      return tab;
    });
  },
  query(queryInfo, arg2?) {
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, async () => {
      const currentWindow = await windows.getCurrent();
      const lastFocusedWindow = await windows.getLastFocused();
      return tabList
        .filter((tab) => {
          let res = true;
          if (queryInfo.active != null) res = res && activeTabId === tab.id;
          if (queryInfo.audible != null) res = res && tab.audible === queryInfo.audible;
          if (queryInfo.autoDiscardable != null)
            res = res && tab.autoDiscardable === queryInfo.autoDiscardable;
          if (queryInfo.currentWindow != null && queryInfo.currentWindow)
            res = res && currentWindow.id === tab.windowId;
          if (queryInfo.currentWindow != null && !queryInfo.currentWindow)
            res = res && currentWindow.id !== tab.windowId;
          if (queryInfo.windowId != null) res = res && tab.windowId === queryInfo.windowId;
          if (queryInfo.discarded != null) res = res && tab.discarded === queryInfo.discarded;
          if (queryInfo.highlighted != null) res = res && tab.highlighted === queryInfo.highlighted;
          if (queryInfo.index != null) res = res && tab.index === queryInfo.index;
          if (queryInfo.lastFocusedWindow != null && queryInfo.lastFocusedWindow)
            res = res && lastFocusedWindow.id === tab.windowId;
          if (queryInfo.lastFocusedWindow != null && !queryInfo.lastFocusedWindow)
            res = res && lastFocusedWindow.id !== tab.windowId;
          if (queryInfo.muted != null) res = res && tab.mutedInfo?.muted === queryInfo.muted;
          if (queryInfo.pinned != null) res = res && tab.pinned === queryInfo.pinned;
          if (queryInfo.status != null) res = res && tab.status === queryInfo.status;
          if (queryInfo.title != null) res = res && tab.title == queryInfo.title;
          if (queryInfo.url != null) res = res && tab.url === queryInfo.url;
          if (queryInfo.windowType != null) res = false;
          return res;
        })
        .map(mapTab);
    });
  },
  highlight(highlightInfo, arg2?) {
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, async () => {
      const tabIds = Array.isArray(highlightInfo.tabs) ? highlightInfo.tabs : [highlightInfo.tabs];
      let window: Browser.windows.Window;
      for (const tabId of tabIds) {
        const tab = await tabs.get(tabId);
        if (tab) {
          window = await windows.get(tab.windowId!);
          tab.highlighted = true;
        }
      }
      await onHighlighted.trigger({ tabIds, windowId: window!.id! });
      return window!;
    });
  },
  update(arg1, arg2?, arg3?) {
    let tabId: number | undefined;
    let updateInfo: Browser.tabs.UpdateProperties | undefined;
    let callback: Callback<Browser.tabs.Tab | undefined> | undefined;

    if (arg3 != null) {
      tabId = arg1 as number;
      updateInfo = arg2 as Browser.tabs.UpdateProperties;
      callback = arg3 as Callback<Browser.tabs.Tab | undefined>;
    } else if (arg2 != null) {
      if (typeof arg1 === 'number') {
        tabId = arg1 as number;
        updateInfo = arg2 as Browser.tabs.UpdateProperties;
      } else {
        updateInfo = arg1 as Browser.tabs.UpdateProperties;
        callback = arg2 as Callback<Browser.tabs.Tab | undefined>;
      }
    } else {
      updateInfo = arg1 as Browser.tabs.UpdateProperties;
    }

    return promiseOrCallback(callback, async () => {
      if (tabId == null) {
        const currentWindow = await windows.getCurrent();
        tabId = currentWindow.tabs!.find((tab) => tab.active)!.id!;
      }

      const tab = await tabs.get(tabId);
      if (!tab) throw new Error('Tab not found');

      const updatedTab = { ...tab, ...updateInfo };
      const tabIndex = tabList.findIndex((tab) => tab.id === tabId);
      tabList[tabIndex] = updatedTab;
      const fullTab = mapTab(updatedTab);

      await onUpdated.trigger(fullTab.id!, updateInfo, fullTab);
      if (updatedTab.active) {
        setActiveTabId(updatedTab.id);
        await onActivated.trigger({ tabId: updatedTab.id!, windowId: updatedTab.windowId });
      }
      return fullTab;
    });
  },
  remove(arg1, arg2?) {
    const tabIds = Array.isArray(arg1) ? arg1 : [arg1];
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, async () => {
      const ids = Array.isArray(tabIds) ? tabIds : [tabIds];
      for (const id of ids) {
        const index = tabList.findIndex((tab) => tab.id === id);
        if (index >= 0) {
          const [removed] = tabList.splice(index, 1);
          const window = await windows.get(removed.id!, { populate: true });
          await onRemoved.trigger(id, { isWindowClosing: false, windowId: window.id! });
          if (!window.tabs?.length) await windows.remove(window.id!);
        }
      }
    });
  },
  onCreated,
  onUpdated,
  onActivated,
  onHighlighted,
  onRemoved,
};
