import type { Browser } from '@wxt-dev/browser';

import { MockNotImplementedError } from './mock-not-implemented-proxy';

const notMockedFunction = (chain: string): (() => never) => {
  throw new MockNotImplementedError(chain);
};
const notMockedListener = (chain: string): Browser.events.Event<() => void> => ({
  addListener: notMockedFunction(`${chain}.addListener`),
  addRules: notMockedFunction(`${chain}.addRules`),
  removeListener: notMockedFunction(`${chain}.removeListener`),
  removeRules: notMockedFunction(`${chain}.removeRules`),
  hasListener: notMockedFunction(`${chain}.hasListener`),
  getRules: notMockedFunction(`${chain}.getRules`),
  hasListeners: notMockedFunction(`${chain}.hasListeners`),
});
const notMockedChromeSetting = (chain: string): Browser.types.ChromeSetting<any> => ({
  clear: notMockedFunction(`${chain}.clear`),
  set: notMockedFunction(`${chain}.set`),
  get: notMockedFunction(`${chain}.get`),
  onChange: notMockedListener(`${chain}.onChange`),
});
const notMockedContentSetting = (chain: string): Browser.contentSettings.ContentSetting<any> => ({
  clear: notMockedFunction(`${chain}.clear`),
  get: notMockedFunction(`${chain}.get`),
  getResourceIdentifiers: notMockedFunction(`${chain}.getResourceIdentifiers`),
  set: notMockedFunction(`${chain}.set`),
});

const emptyEnum = <T>(): T => ({}) as T;

export const base: typeof Browser = {
  accessibilityFeatures: {
    // Other
    animationPolicy: notMockedChromeSetting('accessibilityFeatures.animationPolicy'),
    autoclick: notMockedChromeSetting('accessibilityFeatures.autoclick'),
    caretHighlight: notMockedChromeSetting('accessibilityFeatures.caretHighlight'),
    cursorColor: notMockedChromeSetting('accessibilityFeatures.cursorColor'),
    cursorHighlight: notMockedChromeSetting('accessibilityFeatures.cursorHighlight'),
    dictation: notMockedChromeSetting('accessibilityFeatures.dictation'),
    dockedMagnifier: notMockedChromeSetting('accessibilityFeatures.dockedMagnifier'),
    focusHighlight: notMockedChromeSetting('accessibilityFeatures.focusHighlight'),
    highContrast: notMockedChromeSetting('accessibilityFeatures.highContrast'),
    largeCursor: notMockedChromeSetting('accessibilityFeatures.largeCursor'),
    screenMagnifier: notMockedChromeSetting('accessibilityFeatures.screenMagnifier'),
    selectToSpeak: notMockedChromeSetting('accessibilityFeatures.selectToSpeak'),
    spokenFeedback: notMockedChromeSetting('accessibilityFeatures.spokenFeedback'),
    stickyKeys: notMockedChromeSetting('accessibilityFeatures.stickyKeys'),
    switchAccess: notMockedChromeSetting('accessibilityFeatures.switchAccess'),
    virtualKeyboard: notMockedChromeSetting('accessibilityFeatures.virtualKeyboard'),
  },
  action: {
    // Functions
    disable: notMockedFunction('action.disable'),
    enable: notMockedFunction('action.enable'),
    getBadgeBackgroundColor: notMockedFunction('action.getBadgeBackgroundColor'),
    getBadgeText: notMockedFunction('action.getBadgeText'),
    getBadgeTextColor: notMockedFunction('action.getBadgeTextColor'),
    getPopup: notMockedFunction('action.getPopup'),
    getTitle: notMockedFunction('action.getTitle'),
    getUserSettings: notMockedFunction('action.getUserSettings'),
    isEnabled: notMockedFunction('action.isEnabled'),
    openPopup: notMockedFunction('action.openPopup'),
    setBadgeBackgroundColor: notMockedFunction('action.setBadgeBackgroundColor'),
    setBadgeText: notMockedFunction('action.setBadgeText'),
    setBadgeTextColor: notMockedFunction('action.setBadgeTextColor'),
    setIcon: notMockedFunction('action.setIcon'),
    setPopup: notMockedFunction('action.setPopup'),
    setTitle: notMockedFunction('action.setTitle'),
    // Listeners
    onClicked: notMockedListener('action.onClicked'),
    onUserSettingsChanged: notMockedListener('action.onUserSettingsChanged'),
  },
  alarms: {
    // Functions
    clear: notMockedFunction('alarms.clear'),
    clearAll: notMockedFunction('alarms.clearAll'),
    create: notMockedFunction('alarms.create'),
    get: notMockedFunction('alarms.get'),
    getAll: notMockedFunction('alarms.getAll'),
    // Listeners
    onAlarm: notMockedListener('alarms.onAlarm'),
  },
  audio: {
    // Enums
    DeviceType: emptyEnum(),
    StreamType: emptyEnum(),
    // Functions
    getDevices: notMockedFunction('audio.getDevices'),
    getMute: notMockedFunction('audio.getMute'),
    setActiveDevices: notMockedFunction('audio.setActiveDevices'),
    setMute: notMockedFunction('audio.setMute'),
    setProperties: notMockedFunction('audio.setProperties'),
    // Listeners
    onDeviceListChanged: notMockedListener('audio.onDeviceListChanged'),
    onLevelChanged: notMockedListener('audio.onLevelChanged'),
    onMuteChanged: notMockedListener('audio.onMuteChanged'),
  },
  bookmarks: {
    // Constants
    ROOT_NODE_ID: '0',
    MAX_WRITE_OPERATIONS_PER_HOUR: 1000000,
    MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000,
    // Enums
    BookmarkTreeNodeUnmodifiable: emptyEnum(),
    FolderType: emptyEnum(),
    // Functions
    create: notMockedFunction('bookmarks.create'),
    get: notMockedFunction('bookmarks.get'),
    getChildren: notMockedFunction('bookmarks.getChildren'),
    getRecent: notMockedFunction('bookmarks.getRecent'),
    getSubTree: notMockedFunction('bookmarks.getSubTree'),
    getTree: notMockedFunction('bookmarks.getTree'),
    move: notMockedFunction('bookmarks.move'),
    remove: notMockedFunction('bookmarks.remove'),
    removeTree: notMockedFunction('bookmarks.removeTree'),
    search: notMockedFunction('bookmarks.search'),
    update: notMockedFunction('bookmarks.update'),
    onChanged: notMockedListener('bookmarks.onChanged'),
    onChildrenReordered: notMockedListener('bookmarks.onChildrenReordered'),
    onCreated: notMockedListener('bookmarks.onCreated'),
    onImportBegan: notMockedListener('bookmarks.onImportBegan'),
    onImportEnded: notMockedListener('bookmarks.onImportEnded'),
    onMoved: notMockedListener('bookmarks.onMoved'),
    onRemoved: notMockedListener('bookmarks.onRemoved'),
  },
  browserAction: {
    // Functions
    disable: notMockedFunction('action.disable'),
    enable: notMockedFunction('action.enable'),
    getBadgeBackgroundColor: notMockedFunction('action.getBadgeBackgroundColor'),
    getBadgeText: notMockedFunction('action.getBadgeText'),
    getPopup: notMockedFunction('action.getPopup'),
    getTitle: notMockedFunction('action.getTitle'),
    setBadgeBackgroundColor: notMockedFunction('action.setBadgeBackgroundColor'),
    setBadgeText: notMockedFunction('action.setBadgeText'),
    setIcon: notMockedFunction('action.setIcon'),
    setPopup: notMockedFunction('action.setPopup'),
    setTitle: notMockedFunction('action.setTitle'),
    // Listeners
    onClicked: notMockedListener('action.onClicked'),
  },
  browsingData: {
    // Functions
    settings: notMockedFunction('browsingData.settings'),
    removePluginData: notMockedFunction('removePluginData'),
    removeServiceWorkers: notMockedFunction('removeServiceWorkers'),
    removeFormData: notMockedFunction('removeFormData'),
    removeFileSystems: notMockedFunction('removeFileSystems'),
    remove: notMockedFunction('remove'),
    removePasswords: notMockedFunction('removePasswords'),
    removeCookies: notMockedFunction('removeCookies'),
    removeWebSQL: notMockedFunction('removeWebSQL'),
    removeAppcache: notMockedFunction('removeAppcache'),
    removeCacheStorage: notMockedFunction('removeCacheStorage'),
    removeDownloads: notMockedFunction('removeDownloads'),
    removeLocalStorage: notMockedFunction('removeLocalStorage'),
    removeCache: notMockedFunction('removeCache'),
    removeHistory: notMockedFunction('removeHistory'),
    removeIndexedDB: notMockedFunction('removeIndexedDB'),
  },
  certificateProvider: {
    // Enums
    Algorithm: emptyEnum(),
    Error: emptyEnum(),
    Hash: emptyEnum(),
    PinRequestErrorType: emptyEnum(),
    PinRequestType: emptyEnum(),
    // Functions
    reportSignature: notMockedFunction('certificateProvider.reportSignature'),
    setCertificates: notMockedFunction('certificateProvider.setCertificates'),
    requestPin: notMockedFunction('certificateProvider.requestPin'),
    stopPinRequest: notMockedFunction('certificateProvider.stopPinRequest'),
    // Listeners
    onCertificatesUpdateRequested: notMockedListener(
      'certificateProvider.onCertificatesUpdateRequested',
    ),
    onSignatureRequested: notMockedListener('certificateProvider.onSignatureRequested'),
  },
  commands: {
    getAll: notMockedFunction('commands.getAll'),
    onCommand: notMockedListener('commands.onCommand'),
  },
  contentSettings: {
    // Enums
    AutoVerifyContentSetting: emptyEnum(),
    CameraContentSetting: emptyEnum(),
    ClipboardContentSetting: emptyEnum(),
    CookiesContentSetting: emptyEnum(),
    FullscreenContentSetting: emptyEnum(),
    ImagesContentSetting: emptyEnum(),
    JavascriptContentSetting: emptyEnum(),
    LocationContentSetting: emptyEnum(),
    MicrophoneContentSetting: emptyEnum(),
    MouselockContentSetting: emptyEnum(),
    MultipleAutomaticDownloadsContentSetting: emptyEnum(),
    NotificationsContentSetting: emptyEnum(),
    PluginsContentSetting: emptyEnum(),
    PopupsContentSetting: emptyEnum(),
    PpapiBrokerContentSetting: emptyEnum(),
    Scope: emptyEnum(),
    SoundContentSetting: emptyEnum(),
    // Other
    automaticDownloads: notMockedContentSetting('contentSettings.automaticDownloads'),
    autoVerify: notMockedContentSetting('contentSettings.autoVerify'),
    camera: notMockedContentSetting('contentSettings.camera'),
    clipboard: notMockedContentSetting('contentSettings.clipboard'),
    cookies: notMockedContentSetting('contentSettings.cookies'),
    fullscreen: notMockedContentSetting('contentSettings.fullscreen'),
    images: notMockedContentSetting('contentSettings.images'),
    javascript: notMockedContentSetting('contentSettings.javascript'),
    location: notMockedContentSetting('contentSettings.location'),
    microphone: notMockedContentSetting('contentSettings.microphone'),
    mouselock: notMockedContentSetting('contentSettings.mouselock'),
    notifications: notMockedContentSetting('contentSettings.notifications'),
    popups: notMockedContentSetting('contentSettings.popups'),
    plugins: notMockedContentSetting('contentSettings.plugins'),
    unsandboxedPlugins: notMockedContentSetting('contentSettings.unsandboxedPlugins'),
  },
  contextMenus: {
    // Constants
    ACTION_MENU_TOP_LEVEL_LIMIT: 6,
    // Enums
    ContextType: emptyEnum(),
    ItemType: emptyEnum(),
    // Functions
    create: notMockedFunction('contextMenus.create'),
    remove: notMockedFunction('contextMenus.remove'),
    removeAll: notMockedFunction('contextMenus.removeAll'),
    update: notMockedFunction('contextMenus.update'),
    // Listeners
    onClicked: notMockedListener('contextMenus.onClicked'),
  },
  cookies: {},
};
