import { Action, Tabs } from 'webextension-polyfill';
import { BrowserOverrides } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

const onClicked =
  defineEventWithTrigger<(tab: Tabs.Tab, info: Action.OnClickData | undefined) => void>();

let DEFAULT_BADGE_BACKGROUND_COLOR = '#000000';
let DEFAULT_BADGE_TEXT_COLOR = '#FFFFFF';
type ColorArray = [number, number, number, number];
let DEFAULT_ICON: string | null = null;
let DEFAULT_ICON_PATH: string | null = null;
const badgeTextColorState: ScopedState<string> = {
  global: DEFAULT_BADGE_TEXT_COLOR,
  tabs: new Map(),
  windows: new Map(),
};

interface ScopedState<T> {
  global?: T;
  tabs: Map<number, T>;
  windows: Map<number, T>;
}

const badgeTextState: ScopedState<string> = {
  global: '',
  tabs: new Map(),
  windows: new Map(),
};

const badgeBackgroundColorState: ScopedState<ColorArray> = {
  global: hexToRgbaArray(DEFAULT_BADGE_BACKGROUND_COLOR),
  tabs: new Map(),
  windows: new Map(),
};

const titleState: ScopedState<string> = {
  global: '',
  tabs: new Map(),
  windows: new Map(),
};

function hexToRgbaArray(hex: string): ColorArray {
  hex = hex.replace('#', '');
  let hasAlpha = hex.length === 8;
  let bigint = parseInt(hex, 16);
  let r = (bigint >> (hasAlpha ? 24 : 16)) & 255;
  let g = (bigint >> (hasAlpha ? 16 : 8)) & 255;
  let b = (bigint >> (hasAlpha ? 8 : 0)) & 255;
  let a = hasAlpha ? bigint & 255 : 255;
  return [r, g, b, a];
}

function getScopedValue<T>(state: ScopedState<T>, details?: Action.Details): T | undefined {
  if (!details) return state.global;
  const { tabId, windowId } = details;
  if (tabId !== undefined) return state.tabs.get(tabId);
  if (windowId !== undefined) return state.windows.get(windowId);
  return state.global;
}

export const action: BrowserOverrides['action'] = {
  resetState() {
    onClicked.removeAllListeners();
    badgeTextState.global = '';
    badgeTextState.tabs.clear();
    badgeTextState.windows.clear();

    badgeBackgroundColorState.global = hexToRgbaArray(DEFAULT_BADGE_BACKGROUND_COLOR);
    badgeBackgroundColorState.tabs.clear();
    badgeBackgroundColorState.windows.clear();

    titleState.global = '';
    titleState.tabs.clear();
    titleState.windows.clear();

    DEFAULT_ICON = null;
    DEFAULT_ICON_PATH = null;
  },

  setTitle(details: Action.SetTitleDetailsType) {
    const { title, tabId, windowId } = details;
    if (tabId !== undefined) {
      if (title === null || title === undefined) {
        titleState.tabs.delete(tabId);
      } else {
        titleState.tabs.set(tabId, title);
      }
    } else if (windowId !== undefined) {
      if (title === null || title === undefined) {
        titleState.windows.delete(windowId);
      } else {
        titleState.windows.set(windowId, title);
      }
    } else {
      titleState.global = title ?? '';
    }
    return Promise.resolve();
  },

  getTitle(details: Action.Details): Promise<string> {
    const value = getScopedValue(titleState, details);
    return Promise.resolve(value ?? '');
  },

  setBadgeText(details: Action.SetBadgeTextDetailsType) {
    const { text, tabId, windowId } = details;
    if (tabId !== undefined) {
      if (text === null || text === undefined) {
        badgeTextState.tabs.delete(tabId);
      } else {
        badgeTextState.tabs.set(tabId, text);
      }
    } else if (windowId !== undefined) {
      if (text === null || text === undefined) {
        badgeTextState.windows.delete(windowId);
      } else {
        badgeTextState.windows.set(windowId, text);
      }
    } else {
      badgeTextState.global = text ?? '';
    }
    return Promise.resolve();
  },

  getBadgeText(details: Action.Details): Promise<string> {
    const value = getScopedValue(badgeTextState, details);
    return Promise.resolve(value ?? '');
  },

  setBadgeBackgroundColor(details: Action.SetBadgeBackgroundColorDetailsType) {
    const { color, tabId, windowId } = details;
    let rgbaColor: ColorArray;

    if (typeof color === 'string') {
      rgbaColor = hexToRgbaArray(color);
    } else if (Array.isArray(color)) {
      rgbaColor = [...color] as ColorArray;
    } else {
      rgbaColor = hexToRgbaArray(DEFAULT_BADGE_BACKGROUND_COLOR);
    }

    if (tabId !== undefined) {
      badgeBackgroundColorState.tabs.set(tabId, rgbaColor);
    } else if (windowId !== undefined) {
      badgeBackgroundColorState.windows.set(windowId, rgbaColor);
    } else {
      badgeBackgroundColorState.global = rgbaColor;
    }

    return Promise.resolve();
  },

  getBadgeBackgroundColor(details: Action.Details): Promise<ColorArray> {
    const value = getScopedValue(badgeBackgroundColorState, details);
    return Promise.resolve(value ?? hexToRgbaArray(DEFAULT_BADGE_BACKGROUND_COLOR));
  },
  setBadgeTextColor(details: Action.SetBadgeTextColorDetailsType) {
    const { color, tabId, windowId } = details;

    let normalizedColor = typeof color === 'string' ? color : DEFAULT_BADGE_TEXT_COLOR;

    if (tabId !== undefined) {
      if (color === null || color === undefined) {
        badgeTextColorState.tabs.delete(tabId);
      } else {
        badgeTextColorState.tabs.set(tabId, normalizedColor);
      }
    } else if (windowId !== undefined) {
      if (color === null || color === undefined) {
        badgeTextColorState.windows.delete(windowId);
      } else {
        badgeTextColorState.windows.set(windowId, normalizedColor);
      }
    } else {
      badgeTextColorState.global = normalizedColor;
    }

    return Promise.resolve();
  },

  getBadgeTextColor(details: Action.Details): Promise<string> {
    const value = getScopedValue(badgeTextColorState, details);
    return Promise.resolve(value ?? DEFAULT_BADGE_TEXT_COLOR);
  },

  onClicked,
};
