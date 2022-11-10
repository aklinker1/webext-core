import { Tabs, Windows, windows } from 'webextension-polyfill';
import { FakeBrowser } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';
import { notImplementedApi } from '../utils/notImplementedApi';

type InMemoryTab = Omit<Tabs.Tab, 'active'>;

const onActivated = defineEventWithTrigger<(activeInfo: Tabs.OnActivatedActiveInfoType) => void>();
const onCreated = defineEventWithTrigger<(tab: Tabs.Tab) => void>();
const onUpdated =
  defineEventWithTrigger<
    (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => void
  >();
const onMoved =
  defineEventWithTrigger<(tabId: number, moveInfo: Tabs.OnMovedMoveInfoType) => void>();

const onHighlighted =
  defineEventWithTrigger<(highlightInfo: Tabs.OnHighlightedHighlightInfoType) => void>();
const onDetached =
  defineEventWithTrigger<(tabId: number, detachInfo: Tabs.OnDetachedDetachInfoType) => void>();
const onAttached =
  defineEventWithTrigger<(tabId: number, attachInfo: Tabs.OnAttachedAttachInfoType) => void>();
const onRemoved =
  defineEventWithTrigger<(tabId: number, removeInfo: Tabs.OnRemovedRemoveInfoType) => void>();
const onReplaced = defineEventWithTrigger<(addedTabId: number, removedTabId: number) => void>();
const onZoomChange =
  defineEventWithTrigger<(ZoomChangeInfo: Tabs.OnZoomChangeZoomChangeInfoType) => void>();

const TAB_ID_NONE = -1 as const;
const DEFAULT_TAB: InMemoryTab = {
  id: 0,
  index: 0,
  highlighted: false,
  incognito: false,
  pinned: false,
};
const DEFAULT_NEXT_TAB_ID = 1;

export const tabList: InMemoryTab[] = [DEFAULT_TAB];
export let activeTabId: Tabs.Tab['id'];
let nextTabId = DEFAULT_NEXT_TAB_ID;

function setActiveTabId(id: Tabs.Tab['id']): void {
  activeTabId = id;
}
function getNextTabId(): Tabs.Tab['id'] {
  const id = nextTabId;
  nextTabId++;
  return id;
}

export function mapTab(tab: InMemoryTab): Tabs.Tab {
  return {
    ...tab,
    active: activeTabId === tab.id,
  };
}

export const tabs: FakeBrowser['tabs'] = {
  reset() {
    tabList.length = 1;
    tabList[0] = DEFAULT_TAB;
    activeTabId = undefined;
    nextTabId = DEFAULT_NEXT_TAB_ID;
    onActivated.removeAllListeners();
    onCreated.removeAllListeners();
    onUpdated.removeAllListeners();
    onMoved.removeAllListeners();
    onHighlighted.removeAllListeners();
    onDetached.removeAllListeners();
    onAttached.removeAllListeners();
    onRemoved.removeAllListeners();
    onReplaced.removeAllListeners();
    onZoomChange.removeAllListeners();
  },
  async get(tabId) {
    const tab = tabList.find(tab => tab.id === tabId);
    if (!tab) return undefined!;
    return mapTab(tab);
  },
  getCurrent() {
    if (activeTabId == null) return undefined!;
    return tabs.get(activeTabId);
  },
  connect: notImplementedApi('tabs.connect'),
  sendMessage: notImplementedApi('tabs.sendMessage'),
  async create(createProperties) {
    const window = createProperties.windowId
      ? await windows.get(createProperties.windowId, { populate: true })
      : await windows.getCurrent({ populate: true });
    const newTab: InMemoryTab = {
      highlighted: false,
      incognito: false,
      index: window.tabs?.length ?? 0,
      pinned: createProperties.pinned ?? false,
      windowId: window.id,
      id: getNextTabId(),
    };
    const fullTab = mapTab(newTab);
    await onCreated.trigger(fullTab);
    return fullTab;
  },
  async duplicate(tabId, duplicateProperties?) {
    const tab = await tabs.get(tabId);
    const newTab: InMemoryTab = {
      ...tab,
      id: getNextTabId(),
    };
    const prevActiveTabId = activeTabId;
    if (duplicateProperties?.active) {
      setActiveTabId(newTab.id);
    }
    const fullTab = mapTab(newTab);
    await onCreated.trigger(fullTab);
    if (duplicateProperties?.active)
      await onActivated.trigger({
        tabId: fullTab.id!,
        windowId: fullTab.windowId!,
        previousTabId: prevActiveTabId,
      });
    return fullTab;
  },
  async query(queryInfo) {
    const currentWindow = await windows.getCurrent();
    const lastFocusedWindow = await windows.getLastFocused();
    return tabList
      .filter(tab => {
        let res = true;
        if (queryInfo.active != null) res = res && activeTabId === tab.id;
        if (queryInfo.attention != null) res = res && tab.attention === queryInfo.attention;
        if (queryInfo.audible != null) res = res && tab.audible === queryInfo.audible;
        if (queryInfo.autoDiscardable != null)
          res = res && tab.autoDiscardable === queryInfo.autoDiscardable;
        if (queryInfo.camera != null) res = false;
        if (queryInfo.cookieStoreId != null)
          res = res && tab.cookieStoreId === queryInfo.cookieStoreId;
        if (queryInfo.currentWindow != null && queryInfo.currentWindow)
          res = res && currentWindow.id === tab.windowId;
        if (queryInfo.currentWindow != null && !queryInfo.currentWindow)
          res = res && currentWindow.id !== tab.windowId;
        if (queryInfo.discarded != null) res = res && tab.discarded === queryInfo.discarded;
        if (queryInfo.hidden != null) res = res && tab.hidden === queryInfo.hidden;
        if (queryInfo.highlighted != null) res = res && tab.highlighted === queryInfo.highlighted;
        if (queryInfo.index != null) res = res && tab.index === queryInfo.index;
        if (queryInfo.lastFocusedWindow != null && queryInfo.lastFocusedWindow)
          res = res && lastFocusedWindow.id === tab.windowId;
        if (queryInfo.lastFocusedWindow != null && !queryInfo.lastFocusedWindow)
          res = res && lastFocusedWindow.id !== tab.windowId;
        if (queryInfo.microphone != null) res = false;
        if (queryInfo.muted != null) res = res && tab.mutedInfo?.muted === queryInfo.muted;
        if (queryInfo.openerTabId != null) res = res && !!tab.openerTabId;
        if (queryInfo.pinned != null) res = res && tab.pinned === queryInfo.pinned;
        if (queryInfo.screen != null) res = false;
        if (queryInfo.status != null) res = res && tab.status === queryInfo.status;
        if (queryInfo.title != null) res = res && tab.title == queryInfo.title;
        if (queryInfo.url != null) res = res && tab.url === queryInfo.url;
        if (queryInfo.windowType != null) res = false;
        return res;
      })
      .map(mapTab);
  },
  async highlight(highlightInfo) {
    const tabIds = Array.isArray(highlightInfo.tabs) ? highlightInfo.tabs : [highlightInfo.tabs];
    let window: Windows.Window;
    for (const tabId of tabIds) {
      const tab = await tabs.get(tabId);
      if (tab) {
        window = await windows.get(tab.windowId!);
        tab.highlighted = true;
      }
    }
    await onHighlighted.trigger({ tabIds, windowId: window!.id! });
    return window!;
  },
  // @ts-expect-error
  update(...args) {
    throw Error('tabs.update not implemented');
  },
  move(tabIds, moveProperties) {
    throw Error('tabs.move not implemented');
  },
  reload(tabId?, reloadProperties?) {
    throw Error('tabs.reload not implemented');
  },
  warmup(tabId) {
    throw Error('tabs.warmup not implemented');
  },
  async remove(tabIds) {
    const ids = Array.isArray(tabIds) ? tabIds : [tabIds];
    for (const id of ids) {
      const index = tabList.findIndex(tab => tab.id === id);
      if (index >= 0) {
        const [removed] = tabList.splice(index, 1);
        const window = await windows.get(removed.id!, { populate: true });
        await onRemoved.trigger(id, { isWindowClosing: false, windowId: window.id! });
        if (!window.tabs?.length) await windows.remove(window.id!);
      }
    }
  },
  discard(tabIds) {
    throw Error('tabs.discard not implemented');
  },
  detectLanguage(tabId?) {
    throw Error('tabs.detectLanguage not implemented');
  },
  toggleReaderMode(tabId?) {
    throw Error('tabs.toggleReaderMode not implemented');
  },
  captureTab(tabId?, options?) {
    throw Error('tabs.captureTab not implemented');
  },
  captureVisibleTab(windowId?, options?) {
    throw Error('tabs.captureVisibleTab not implemented');
  },
  // @ts-expect-error
  executeScript(...args) {
    throw Error('tabs.executeScript not implemented');
  },
  // @ts-expect-error
  insertCSS(...args) {
    throw Error('tabs.insertCSS not implemented');
  },
  // @ts-expect-error
  removeCSS(...args) {
    throw Error('tabs.removeCSS not implemented');
  },
  // @ts-expect-error
  setZoom(...args) {
    throw Error('tabs.setZoom not implemented');
  },
  getZoom(tabId?) {
    throw Error('tabs.getZoom not implemented');
  },
  // @ts-expect-error
  setZoomSettings(...args) {
    throw Error('tabs.setZoomSettings not implemented');
  },
  getZoomSettings(tabId?) {
    throw Error('tabs.getZoomSettings not implemented');
  },
  print() {
    throw Error('tabs.print not implemented');
  },
  printPreview() {
    throw Error('tabs.printPreview not implemented');
  },
  saveAsPDF(pageSettings) {
    throw Error('tabs.saveAsPDF not implemented');
  },
  show(tabIds) {
    throw Error('tabs.show not implemented');
  },
  hide(tabIds) {
    throw Error('tabs.hide not implemented');
  },
  moveInSuccession(tabIds, tabId?, options?) {
    throw Error('tabs.moveInSuccession not implemented');
  },
  goForward(tabId?) {
    throw Error('tabs.getForward not implemented');
  },
  goBack(tabId?) {
    throw Error('tabs.goBack not implemented');
  },
  onCreated,
  onUpdated,
  onMoved,
  onActivated,
  onHighlighted,
  onDetached,
  onAttached,
  onRemoved,
  onReplaced,
  onZoomChange,
  TAB_ID_NONE,
};
