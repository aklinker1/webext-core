import { Windows } from 'webextension-polyfill';
import { BrowserOverrides, FakeBrowser } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';
import { mapTab, tabList } from './tabs';

type InMemoryWindow = Omit<Windows.Window, 'focused' | 'tabs'>;

const onCreated = defineEventWithTrigger<(window: Windows.Window) => void>();
const onRemoved = defineEventWithTrigger<(windowId: number) => void>();
const onFocusChanged = defineEventWithTrigger<(windowId: number) => void>();

const DEFAULT_WINDOW: InMemoryWindow = {
  id: 0,
  alwaysOnTop: false,
  incognito: false,
};
const DEFAULT_NEXT_WINDOW_ID = 1;

export const windowList: InMemoryWindow[] = [DEFAULT_WINDOW];
export let focusedWindowId: Windows.Window['id'];
export let lastFocusedWindowId: Windows.Window['id'];
let nextWindowId = DEFAULT_NEXT_WINDOW_ID;

function setFocusedWindowId(id: Windows.Window['id']): void {
  lastFocusedWindowId = focusedWindowId;
  focusedWindowId = id;
}
function getNextWindowId(): Windows.Window['id'] {
  const id = nextWindowId;
  nextWindowId++;
  return id;
}

function mapWindow(window: InMemoryWindow, getInfo?: Windows.GetInfo): Windows.Window {
  return {
    ...window,
    tabs: getInfo?.populate
      ? tabList.filter(tab => tab.windowId === window.id).map(mapTab)
      : undefined,
    focused: window.id === focusedWindowId,
  };
}

function mapCreateType(type: Windows.CreateType | undefined): Windows.WindowType | undefined {
  if (type == null) return undefined;
  if (type == 'detached_panel') return 'panel';
  return type;
}

export const windows: BrowserOverrides['windows'] = {
  resetState() {
    windowList.length = 1;
    windowList[0] = DEFAULT_WINDOW;
    focusedWindowId = undefined;
    lastFocusedWindowId = undefined;
    nextWindowId = DEFAULT_NEXT_WINDOW_ID;
    onCreated.removeAllListeners();
    onRemoved.removeAllListeners();
    onFocusChanged.removeAllListeners();
  },
  async get(windowId, getInfo?) {
    const window = windowList.find(window => window.id === windowId);
    if (!window) return undefined!;
    return mapWindow(window, getInfo);
  },
  getCurrent(getInfo?) {
    if (focusedWindowId == null) return undefined!;
    return windows.get(focusedWindowId, getInfo);
  },
  getLastFocused(getInfo?) {
    if (lastFocusedWindowId == null) return undefined!;
    return windows.get(lastFocusedWindowId, getInfo);
  },
  async getAll(getInfo?) {
    return windowList.map(window => mapWindow(window, getInfo));
  },
  async create(createData?) {
    const newWindow: InMemoryWindow = {
      id: getNextWindowId(),
      alwaysOnTop: false,
      incognito: createData?.incognito ?? false,
      height: createData?.height,
      left: createData?.left,
      state: createData?.state,
      top: createData?.top,
      type: mapCreateType(createData?.type),
      width: createData?.width,
    };
    windowList.push(newWindow);
    if (createData?.focused) setFocusedWindowId(newWindow.id);

    const fullWindow = mapWindow(newWindow);
    await onCreated.trigger(fullWindow);
    if (createData?.focused) onFocusChanged.trigger(fullWindow.id!);

    return fullWindow;
  },
  async update(windowId, updateInfo) {
    const window = windowList.find(window => window.id === windowId);
    // TODO: Verify this behavior
    if (!window) return undefined!;

    return mapWindow(window);
  },
  async remove(windowId) {
    const index = windowList.findIndex(window => window.id === windowId);
    if (index < 0) return;
    windowList.splice(index, 1);
    await onRemoved.trigger(windowId);
  },
  onCreated,
  onRemoved,
  onFocusChanged,
};
