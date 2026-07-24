import type { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';
import { mapTab, tabList } from './tabs';

type InMemoryWindow = Omit<Browser.windows.Window, 'focused' | 'tabs'>;

const onCreated = defineEventWithTrigger<(window: Browser.windows.Window) => void>();
const onRemoved = defineEventWithTrigger<(windowId: number) => void>();
const onFocusChanged = defineEventWithTrigger<(windowId: number) => void>();

type WindowCallback = (w: Browser.windows.Window) => void;
type WindowsCallback = (ws: Browser.windows.Window[]) => void;

export const DEFAULT_WINDOW: InMemoryWindow = {
  id: 0,
  alwaysOnTop: false,
  incognito: false,
};
const DEFAULT_NEXT_WINDOW_ID = 1;

export const windowList: InMemoryWindow[] = [DEFAULT_WINDOW];
export let focusedWindowId: Browser.windows.Window['id'];
export let lastFocusedWindowId: Browser.windows.Window['id'];
let nextWindowId = DEFAULT_NEXT_WINDOW_ID;

function setFocusedWindowId(id: Browser.windows.Window['id']): void {
  lastFocusedWindowId = focusedWindowId;
  focusedWindowId = id;
}
function getNextWindowId(): Browser.windows.Window['id'] {
  const id = nextWindowId;
  nextWindowId++;
  return id;
}

function mapWindow(
  window: InMemoryWindow,
  getInfo?: Browser.windows.QueryOptions,
): Browser.windows.Window {
  return {
    ...window,
    tabs: getInfo?.populate
      ? tabList.filter((tab) => tab.windowId === window.id).map(mapTab)
      : undefined,
    focused: window.id === focusedWindowId,
  };
}

function mapCreateType(type: string | undefined): Browser.windows.WindowType | undefined {
  if (type == null) return undefined;
  if (type == 'detached_panel') return 'panel' as Browser.windows.WindowType;
  return type as string as Browser.windows.WindowType;
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
  async get(windowId, arg2?, arg3?) {
    const queryOptions = typeof arg2 === 'function' ? undefined : arg2;
    const callback = typeof arg2 === 'function' ? arg2 : (arg3 as WindowCallback);

    const window = windowList.find((window) => window.id === windowId);
    if (!window) return undefined!;

    const res = mapWindow(window, queryOptions);
    return promiseOrCallback(res, callback);
  },
  getCurrent(arg1, arg2?) {
    const queryOptions = typeof arg1 === 'function' ? undefined : arg1;
    const callback = typeof arg1 === 'function' ? arg1 : (arg2 as WindowCallback);

    const res = focusedWindowId == null ? undefined! : windows.get(focusedWindowId, queryOptions);

    return promiseOrCallback(res, callback);
  },
  getLastFocused(arg1, arg2?) {
    const queryOptions = typeof arg1 === 'function' ? undefined : arg1;
    const callback = typeof arg1 === 'function' ? arg1 : (arg2 as WindowCallback);

    const res =
      lastFocusedWindowId == null ? undefined! : windows.get(lastFocusedWindowId, queryOptions);
    return promiseOrCallback(res, callback);
  },
  async getAll(arg1, arg2?) {
    const queryOptions = typeof arg1 === 'function' ? undefined : arg1;
    const callback = typeof arg1 === 'function' ? arg1 : (arg2 as WindowsCallback);

    const res = windowList.map((window) => mapWindow(window, queryOptions));
    return promiseOrCallback(res, callback);
  },
  async create(arg1, arg2?) {
    const createData = typeof arg1 === 'function' ? undefined : arg1;
    const callback = typeof arg1 === 'function' ? arg1 : (arg2 as WindowCallback);

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

    return promiseOrCallback(fullWindow, callback);
  },
  async update(windowId, arg2, arg3?) {
    const _updateInfo = typeof arg2 === 'function' ? undefined : arg2;
    const callback = typeof arg2 === 'function' ? arg2 : (arg3 as WindowCallback);

    const window = windowList.find((window) => window.id === windowId);
    // TODO: Verify this behavior
    if (!window) return undefined!;

    return promiseOrCallback(mapWindow(window), callback);
  },
  remove(windowId, arg1?) {
    const callback = typeof arg1 === 'function' ? (arg1 as () => void) : undefined;

    const index = windowList.findIndex((window) => window.id === windowId);
    if (index < 0) return promiseOrCallback(Promise.resolve(), callback);
    windowList.splice(index, 1);

    const res = onRemoved.trigger(windowId).then(() => {});
    return promiseOrCallback(res, callback);
  },
  onCreated,
  onRemoved,
  onFocusChanged,
};
