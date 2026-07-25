import type { Browser } from '@wxt-dev/browser';

export class MockNotImplementedError extends Error {
  constructor(chain: string) {
    super(
      `${chain} not implemented: mock the function yourself using your testing framework, or submit a PR with an in-memory implementation.`,
    );
  }
}

const notMockedFunction = (chain: string) => (): never => {
  throw new MockNotImplementedError(chain);
};
const notMockedEventWithRules = (chain: string): Browser.events.Event<(...args: any[]) => any> => ({
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
  onChange: notMockedEventWithRules(`${chain}.onChange`),
});
const notMockedContentSetting = (chain: string): Browser.contentSettings.ContentSetting<any> => ({
  clear: notMockedFunction(`${chain}.clear`),
  get: notMockedFunction(`${chain}.get`),
  getResourceIdentifiers: notMockedFunction(`${chain}.getResourceIdentifiers`),
  set: notMockedFunction(`${chain}.set`),
});
const notMockedClass = <T>(chain: string): T =>
  class {
    constructor() {
      throw new MockNotImplementedError(chain);
    }
  } as T;

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
    // Events
    onClicked: notMockedEventWithRules('action.onClicked'),
    onUserSettingsChanged: notMockedEventWithRules('action.onUserSettingsChanged'),
  },
  alarms: {
    // Functions
    clear: notMockedFunction('alarms.clear'),
    clearAll: notMockedFunction('alarms.clearAll'),
    create: notMockedFunction('alarms.create'),
    get: notMockedFunction('alarms.get'),
    getAll: notMockedFunction('alarms.getAll'),
    // Events
    onAlarm: notMockedEventWithRules('alarms.onAlarm'),
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
    // Events
    onDeviceListChanged: notMockedEventWithRules('audio.onDeviceListChanged'),
    onLevelChanged: notMockedEventWithRules('audio.onLevelChanged'),
    onMuteChanged: notMockedEventWithRules('audio.onMuteChanged'),
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
    onChanged: notMockedEventWithRules('bookmarks.onChanged'),
    onChildrenReordered: notMockedEventWithRules('bookmarks.onChildrenReordered'),
    onCreated: notMockedEventWithRules('bookmarks.onCreated'),
    onImportBegan: notMockedEventWithRules('bookmarks.onImportBegan'),
    onImportEnded: notMockedEventWithRules('bookmarks.onImportEnded'),
    onMoved: notMockedEventWithRules('bookmarks.onMoved'),
    onRemoved: notMockedEventWithRules('bookmarks.onRemoved'),
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
    // Events
    onClicked: notMockedEventWithRules('action.onClicked'),
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
    // Events
    onCertificatesUpdateRequested: notMockedEventWithRules(
      'certificateProvider.onCertificatesUpdateRequested',
    ),
    onSignatureRequested: notMockedEventWithRules('certificateProvider.onSignatureRequested'),
  },
  commands: {
    getAll: notMockedFunction('commands.getAll'),
    onCommand: notMockedEventWithRules('commands.onCommand'),
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
    // Events
    onClicked: notMockedEventWithRules('contextMenus.onClicked'),
  },
  cookies: {
    // Enums
    OnChangedCause: emptyEnum(),
    SameSiteStatus: emptyEnum(),
    // Functions
    get: notMockedFunction('cookies.get'),
    getAll: notMockedFunction('cookies.getAll'),
    getAllCookieStores: notMockedFunction('cookies.getAllCookieStores'),
    getPartitionKey: notMockedFunction('cookies.getPartitionKey'),
    remove: notMockedFunction('cookies.remove'),
    set: notMockedFunction('cookies.set'),
    // Events
    onChanged: notMockedEventWithRules('cookies.onChanged'),
  },
  debugger: {
    // Enums
    DetachReason: emptyEnum(),
    TargetInfoType: emptyEnum(),
    // Functions
    attach: notMockedFunction('debugger.attach'),
    detach: notMockedFunction('debugger.detach'),
    getTargets: notMockedFunction('debugger.getTargets'),
    sendCommand: notMockedFunction('debugger.sendCommand'),
    // Events
    onDetach: notMockedEventWithRules('debugger.onDetach'),
    onEvent: notMockedEventWithRules('debugger.onEvent'),
  },
  declarativeContent: {
    // Other
    onPageChanged: notMockedEventWithRules('declarativeContent.onPageChanged'),
    // Classes
    PageStateMatcher: notMockedClass('declarativeContent.PageStateMatcher'),
    ShowAction: notMockedClass('declarativeContent.ShowAction'),
    ShowPageAction: notMockedClass('declarativeContent.ShowPageAction'),
    SetIcon: notMockedClass('declarativeContent.SetIcon'),
    RequestContentScript: notMockedClass('declarativeContent.RequestContentScript'),
  },
  declarativeNetRequest: {
    // Constants
    DYNAMIC_RULESET_ID: '_dynamic',
    SESSION_RULESET_ID: '_session',
    GETMATCHEDRULES_QUOTA_INTERVAL: 10 as const,
    GUARANTEED_MINIMUM_STATIC_RULES: 30000 as const,
    MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL: 20 as const,
    MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES: 5000 as const,
    MAX_NUMBER_OF_DYNAMIC_RULES: 30000 as const,
    MAX_NUMBER_OF_SESSION_RULES: 5000 as const,
    MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES: 5000 as const,
    MAX_NUMBER_OF_UNSAFE_SESSION_RULES: 5000 as const,
    MAX_NUMBER_OF_REGEX_RULES: 1000 as const,
    MAX_NUMBER_OF_STATIC_RULESETS: 100 as const,
    MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: 50 as const,
    // Enums
    DomainType: emptyEnum(),
    ResourceType: emptyEnum(),
    RuleActionType: emptyEnum(),
    HeaderOperation: emptyEnum(),
    RequestMethod: emptyEnum(),
    UnsupportedRegexReason: emptyEnum(),
    RuleConditionKeys: emptyEnum(),
    // Functions
    getAvailableStaticRuleCount: notMockedFunction(
      'declarativeNetRequest.getAvailableStaticRuleCount',
    ),
    getDisabledRuleIds: notMockedFunction('declarativeNetRequest.getDisabledRuleIds'),
    getDynamicRules: notMockedFunction('declarativeNetRequest.getDynamicRules'),
    getEnabledRulesets: notMockedFunction('declarativeNetRequest.getEnabledRulesets'),
    getMatchedRules: notMockedFunction('declarativeNetRequest.getMatchedRules'),
    getSessionRules: notMockedFunction('declarativeNetRequest.getSessionRules'),
    isRegexSupported: notMockedFunction('declarativeNetRequest.isRegexSupported'),
    setExtensionActionOptions: notMockedFunction('declarativeNetRequest.setExtensionActionOptions'),
    testMatchOutcome: notMockedFunction('declarativeNetRequest.testMatchOutcome'),
    updateDynamicRules: notMockedFunction('declarativeNetRequest.updateDynamicRules'),
    updateEnabledRulesets: notMockedFunction('declarativeNetRequest.updateEnabledRulesets'),
    updateSessionRules: notMockedFunction('declarativeNetRequest.updateSessionRules'),
    updateStaticRules: notMockedFunction('declarativeNetRequest.updateStaticRules'),
    // Events
    onRuleMatchedDebug: notMockedEventWithRules('declarativeNetRequest.onRuleMatchedDebug'),
  },
  desktopCapture: {
    // Enums
    DesktopCaptureSourceType: emptyEnum(),
    // Functions
    chooseDesktopMedia: notMockedFunction('desktopCapture.chooseDesktopMedia'),
    cancelChooseDesktopMedia: notMockedFunction('desktopCapture.cancelChooseDesktopMedia'),
  },
  devtools: {
    inspectedWindow: {
      // Properties
      tabId: 0,
      // Functions
      eval: notMockedFunction('devtools.inspectedWindow.eval'),
      getResources: notMockedFunction('devtools.inspectedWindow.getResources'),
      reload: notMockedFunction('devtools.inspectedWindow.reload'),
      // Events
      onResourceAdded: notMockedEventWithRules('devtools.inspectedWindow.onResourceAdded'),
      onResourceContentCommitted: notMockedEventWithRules(
        'devtools.inspectedWindow.onResourceContentCommitted',
      ),
    },
    network: {
      // Functions
      getHAR: notMockedFunction('devtools.network.getHAR'),
      // Events
      onNavigated: notMockedEventWithRules('devtools.network.onNavigated'),
      onRequestFinished: notMockedEventWithRules('devtools.network.onRequestFinished'),
    },
    panels: {
      // Properties
      themeName: 'default',
      // Functions
      create: notMockedFunction('devtools.panels.create'),
      setOpenResourceHandler: notMockedFunction('devtools.panels.setOpenResourceHandler'),
      openResource: notMockedFunction('devtools.panels.openResource'),
      setThemeChangeHandler: notMockedFunction('devtools.panels.setThemeChangeHandler'),
      // Other
      elements: {
        createSidebarPane: notMockedFunction('devtools.panels.elements.createSidebarPane'),
        onSelectionChanged: notMockedEventWithRules('devtools.panels.elements.onSelectionChanged'),
      },
      sources: {
        createSidebarPane: notMockedFunction('devtools.panels.sources.createSidebarPane'),
        onSelectionChanged: notMockedEventWithRules('devtools.panels.sources.onSelectionChanged'),
      },
    },
    performance: {
      // Events
      onProfilingStarted: notMockedEventWithRules('devtools.performance.onProfilingStarted'),
      onProfilingStopped: notMockedEventWithRules('devtools.performance.onProfilingStopped'),
    },
    recorder: {
      // Functions
      createView: notMockedFunction('devtools.recorder.createView'),
      registerRecorderExtensionPlugin: notMockedFunction(
        'devtools.recorder.registerRecorderExtensionPlugin',
      ),
    },
  },
  downloads: {
    // Enums
    DangerType: emptyEnum(),
    FilenameConflictAction: emptyEnum(),
    InterruptReason: emptyEnum(),
    State: emptyEnum(),
    HttpMethod: emptyEnum(),
    // Functions
    acceptDanger: notMockedFunction('downloads.acceptDanger'),
    cancel: notMockedFunction('downloads.cancel'),
    download: notMockedFunction('downloads.download'),
    erase: notMockedFunction('downloads.erase'),
    getFileIcon: notMockedFunction('downloads.getFileIcon'),
    open: notMockedFunction('downloads.open'),
    pause: notMockedFunction('downloads.pause'),
    removeFile: notMockedFunction('downloads.removeFile'),
    resume: notMockedFunction('downloads.resume'),
    search: notMockedFunction('downloads.search'),
    setShelfEnabled: notMockedFunction('downloads.setShelfEnabled'),
    setUiOptions: notMockedFunction('downloads.setUiOptions'),
    show: notMockedFunction('downloads.show'),
    showDefaultFolder: notMockedFunction('downloads.showDefaultFolder'),
    // Events
    onCreated: notMockedEventWithRules('downloads.onCreated'),
    onChanged: notMockedEventWithRules('downloads.onChanged'),
    onDeterminingFilename: notMockedEventWithRules('downloads.onDeterminingFilename'),
    onErased: notMockedEventWithRules('downloads.onErased'),
  },
  extension: {
    // Properties
    inIncognitoContext: false,
    lastError: undefined,
    // Enums
    ViewType: emptyEnum(),
    // Functions
    getBackgroundPage: notMockedFunction('extension.getBackgroundPage'),
    getURL: notMockedFunction('extension.getURL'),
    getViews: notMockedFunction('extension.getViews'),
    isAllowedFileSchemeAccess: notMockedFunction('extension.isAllowedFileSchemeAccess'),
    isAllowedIncognitoAccess: notMockedFunction('extension.isAllowedIncognitoAccess'),
    setUpdateUrlData: notMockedFunction('extension.setUpdateUrlData'),
    sendRequest: notMockedFunction('extension.sendRequest'),
    getExtensionTabs: notMockedFunction('extension.getExtensionTabs'),
    // Events
    onRequest: notMockedEventWithRules('extension.onRequest'),
    onRequestExternal: notMockedEventWithRules('extension.onRequestExternal'),
  },
  history: {
    // Enums
    TransitionType: emptyEnum(),
    // Functions
    addUrl: notMockedFunction('history.addUrl'),
    deleteAll: notMockedFunction('history.deleteAll'),
    deleteRange: notMockedFunction('history.deleteRange'),
    deleteUrl: notMockedFunction('history.deleteUrl'),
    getVisits: notMockedFunction('history.getVisits'),
    search: notMockedFunction('history.search'),
    // Events
    onVisitRemoved: notMockedEventWithRules('history.onVisitRemoved'),
    onVisited: notMockedEventWithRules('history.onVisited'),
  },
  i18n: {
    // Functions
    detectLanguage: notMockedFunction('i18n.detectLanguage'),
    getAcceptLanguages: notMockedFunction('i18n.getAcceptLanguages'),
    getMessage: notMockedFunction('i18n.getMessage'),
    getUILanguage: notMockedFunction('i18n.getUILanguage'),
  },
  identity: {
    // Enums
    AccountStatus: emptyEnum(),
    // Functions
    getAccounts: notMockedFunction('identity.getAccounts'),
    getAuthToken: notMockedFunction('identity.getAuthToken'),
    getProfileUserInfo: notMockedFunction('identity.getProfileUserInfo'),
    getRedirectURL: notMockedFunction('identity.getRedirectURL'),
    launchWebAuthFlow: notMockedFunction('identity.launchWebAuthFlow'),
    removeCachedAuthToken: notMockedFunction('identity.removeCachedAuthToken'),
    clearAllCachedAuthTokens: notMockedFunction('identity.clearAllCachedAuthTokens'),
    // Events
    onSignInChanged: notMockedEventWithRules('identity.onSignInChanged'),
  },
  idle: {
    // Enums
    IdleState: emptyEnum(),
    // Functions
    queryState: notMockedFunction('idle.queryState'),
    setDetectionInterval: notMockedFunction('idle.setDetectionInterval'),
    getAutoLockDelay: notMockedFunction('idle.getAutoLockDelay'),
    // Events
    onStateChanged: notMockedEventWithRules('idle.onStateChanged'),
  },
  management: {
    // Enums
    ExtensionDisabledReason: emptyEnum(),
    ExtensionInstallType: emptyEnum(),
    ExtensionType: emptyEnum(),
    LaunchType: emptyEnum(),
    // Functions
    get: notMockedFunction('management.get'),
    getAll: notMockedFunction('management.getAll'),
    getSelf: notMockedFunction('management.getSelf'),
    launchApp: notMockedFunction('management.launchApp'),
    setEnabled: notMockedFunction('management.setEnabled'),
    setLaunchType: notMockedFunction('management.setLaunchType'),
    uninstall: notMockedFunction('management.uninstall'),
    uninstallSelf: notMockedFunction('management.uninstallSelf'),
    createAppShortcut: notMockedFunction('management.createAppShortcut'),
    generateAppForLink: notMockedFunction('management.generateAppForLink'),
    getPermissionWarningsById: notMockedFunction('management.getPermissionWarningsById'),
    getPermissionWarningsByManifest: notMockedFunction(
      'management.getPermissionWarningsByManifest',
    ),
    installReplacementWebApp: notMockedFunction('management.installReplacementWebApp'),
    // Events
    onDisabled: notMockedEventWithRules('management.onDisabled'),
    onEnabled: notMockedEventWithRules('management.onEnabled'),
    onInstalled: notMockedEventWithRules('management.onInstalled'),
    onUninstalled: notMockedEventWithRules('management.onUninstalled'),
  },
  notifications: {
    // Enums
    PermissionLevel: emptyEnum(),
    TemplateType: emptyEnum(),
    // Functions
    clear: notMockedFunction('notifications.clear'),
    create: notMockedFunction('notifications.create'),
    getAll: notMockedFunction('notifications.getAll'),
    getPermissionLevel: notMockedFunction('notifications.getPermissionLevel'),
    update: notMockedFunction('notifications.update'),
    // Events
    onButtonClicked: notMockedEventWithRules('notifications.onButtonClicked'),
    onClicked: notMockedEventWithRules('notifications.onClicked'),
    onClosed: notMockedEventWithRules('notifications.onClosed'),
    onPermissionLevelChanged: notMockedEventWithRules('notifications.onPermissionLevelChanged'),
    onShowSettings: notMockedEventWithRules('notifications.onShowSettings'),
  },
  omnibox: {
    // Enums
    OnInputEnteredDisposition: emptyEnum(),
    DescriptionStyleType: emptyEnum(),
    // Functions
    setDefaultSuggestion: notMockedFunction('omnibox.setDefaultSuggestion'),
    // Events
    onInputCancelled: notMockedEventWithRules('omnibox.onInputCancelled'),
    onInputChanged: notMockedEventWithRules('omnibox.onInputChanged'),
    onInputEntered: notMockedEventWithRules('omnibox.onInputEntered'),
    onInputStarted: notMockedEventWithRules('omnibox.onInputStarted'),
    onDeleteSuggestion: notMockedEventWithRules('omnibox.onDeleteSuggestion'),
  },
  pageAction: {
    // Functions
    getPopup: notMockedFunction('pageAction.getPopup'),
    getTitle: notMockedFunction('pageAction.getTitle'),
    hide: notMockedFunction('pageAction.hide'),
    setIcon: notMockedFunction('pageAction.setIcon'),
    setPopup: notMockedFunction('pageAction.setPopup'),
    setTitle: notMockedFunction('pageAction.setTitle'),
    show: notMockedFunction('pageAction.show'),
    // Events
    onClicked: notMockedEventWithRules('pageAction.onClicked'),
  },
  permissions: {
    // Functions
    contains: notMockedFunction('permissions.contains'),
    getAll: notMockedFunction('permissions.getAll'),
    remove: notMockedFunction('permissions.remove'),
    request: notMockedFunction('permissions.request'),
    addHostAccessRequest: notMockedFunction('permissions.addHostAccessRequest'),
    removeHostAccessRequest: notMockedFunction('permissions.removeHostAccessRequest'),
    // Events
    onAdded: notMockedEventWithRules('permissions.onAdded'),
    onRemoved: notMockedEventWithRules('permissions.onRemoved'),
  },
  proxy: {
    // Enums
    Mode: emptyEnum(),
    Scheme: emptyEnum(),
    // Other
    settings: notMockedChromeSetting('proxy.settings'),
    // Events
    onProxyError: notMockedEventWithRules('proxy.onProxyError'),
  },
  runtime: {
    // Properties
    id: 'extension-id',
    lastError: undefined,
    // Enums
    OnRestartRequiredReason: emptyEnum(),
    OnInstalledReason: emptyEnum(),
    PlatformArch: emptyEnum(),
    PlatformNaclArch: emptyEnum(),
    PlatformOs: emptyEnum(),
    RequestUpdateCheckStatus: emptyEnum(),
    // Functions
    connect: notMockedFunction('runtime.connect'),
    connectNative: notMockedFunction('runtime.connectNative'),
    getBackgroundPage: notMockedFunction('runtime.getBackgroundPage'),
    getManifest: notMockedFunction('runtime.getManifest'),
    getPlatformInfo: notMockedFunction('runtime.getPlatformInfo'),
    getURL: notMockedFunction('runtime.getURL'),
    openOptionsPage: notMockedFunction('runtime.openOptionsPage'),
    reload: notMockedFunction('runtime.reload'),
    requestUpdateCheck: notMockedFunction('runtime.requestUpdateCheck'),
    restart: notMockedFunction('runtime.restart'),
    restartAfterDelay: notMockedFunction('runtime.restartAfterDelay'),
    sendMessage: notMockedFunction('runtime.sendMessage'),
    sendNativeMessage: notMockedFunction('runtime.sendNativeMessage'),
    setUninstallURL: notMockedFunction('runtime.setUninstallURL'),
    getContexts: notMockedFunction('runtime.getContexts'),
    getPackageDirectoryEntry: notMockedFunction('runtime.getPackageDirectoryEntry'),
    getVersion: notMockedFunction('runtime.getVersion'),
    // Enums
    ContextType: emptyEnum(),
    // Events
    onBrowserUpdateAvailable: notMockedEventWithRules('runtime.onBrowserUpdateAvailable'),
    onConnect: notMockedEventWithRules('runtime.onConnect'),
    onConnectExternal: notMockedEventWithRules('runtime.onConnectExternal'),
    onConnectNative: notMockedEventWithRules('runtime.onConnectNative'),
    onInstalled: notMockedEventWithRules('runtime.onInstalled'),
    onMessage: notMockedEventWithRules('runtime.onMessage'),
    onMessageExternal: notMockedEventWithRules('runtime.onMessageExternal'),
    onRestartRequired: notMockedEventWithRules('runtime.onRestartRequired'),
    onStartup: notMockedEventWithRules('runtime.onStartup'),
    onSuspend: notMockedEventWithRules('runtime.onSuspend'),
    onSuspendCanceled: notMockedEventWithRules('runtime.onSuspendCanceled'),
    onUpdateAvailable: notMockedEventWithRules('runtime.onUpdateAvailable'),
    onUserScriptMessage: notMockedEventWithRules('runtime.onUserScriptMessage'),
    onUserScriptConnect: notMockedEventWithRules('runtime.onUserScriptConnect'),
  },
  scripting: {
    // Enums
    StyleOrigin: emptyEnum(),
    ExecutionWorld: emptyEnum(),
    // Functions
    executeScript: notMockedFunction('scripting.executeScript'),
    getRegisteredContentScripts: notMockedFunction('scripting.getRegisteredContentScripts'),
    insertCSS: notMockedFunction('scripting.insertCSS'),
    registerContentScripts: notMockedFunction('scripting.registerContentScripts'),
    removeCSS: notMockedFunction('scripting.removeCSS'),
    unregisterContentScripts: notMockedFunction('scripting.unregisterContentScripts'),
    updateContentScripts: notMockedFunction('scripting.updateContentScripts'),
  },
  search: {
    // Enums
    Disposition: emptyEnum(),
    // Functions
    query: notMockedFunction('search.query'),
  },
  sessions: {
    // Constants
    MAX_SESSION_RESULTS: 25,
    // Functions
    getRecentlyClosed: notMockedFunction('sessions.getRecentlyClosed'),
    getDevices: notMockedFunction('sessions.getDevices'),
    restore: notMockedFunction('sessions.restore'),
    // Events
    onChanged: notMockedEventWithRules('sessions.onChanged'),
  },
  storage: {
    // Enums
    AccessLevel: emptyEnum(),
    // Other
    local: {
      get: notMockedFunction('storage.local.get'),
      getKeys: notMockedFunction('storage.local.getKeys'),
      getBytesInUse: notMockedFunction('storage.local.getBytesInUse'),
      set: notMockedFunction('storage.local.set'),
      remove: notMockedFunction('storage.local.remove'),
      clear: notMockedFunction('storage.local.clear'),
      setAccessLevel: notMockedFunction('storage.local.setAccessLevel'),
      onChanged: notMockedEventWithRules('storage.local.onChanged'),
      QUOTA_BYTES: 10485760,
    },
    managed: {
      get: notMockedFunction('storage.managed.get'),
      getKeys: notMockedFunction('storage.managed.getKeys'),
      getBytesInUse: notMockedFunction('storage.managed.getBytesInUse'),
      set: notMockedFunction('storage.managed.set'),
      remove: notMockedFunction('storage.managed.remove'),
      clear: notMockedFunction('storage.managed.clear'),
      setAccessLevel: notMockedFunction('storage.managed.setAccessLevel'),
      onChanged: notMockedEventWithRules('storage.managed.onChanged'),
    },
    sync: {
      get: notMockedFunction('storage.sync.get'),
      getKeys: notMockedFunction('storage.sync.getKeys'),
      getBytesInUse: notMockedFunction('storage.sync.getBytesInUse'),
      set: notMockedFunction('storage.sync.set'),
      remove: notMockedFunction('storage.sync.remove'),
      clear: notMockedFunction('storage.sync.clear'),
      setAccessLevel: notMockedFunction('storage.sync.setAccessLevel'),
      onChanged: notMockedEventWithRules('storage.sync.onChanged'),
      MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000,
      QUOTA_BYTES: 102400,
      QUOTA_BYTES_PER_ITEM: 8192,
      MAX_ITEMS: 512,
      MAX_WRITE_OPERATIONS_PER_HOUR: 1800,
      MAX_WRITE_OPERATIONS_PER_MINUTE: 120,
    },
    session: {
      get: notMockedFunction('storage.session.get'),
      getKeys: notMockedFunction('storage.session.getKeys'),
      getBytesInUse: notMockedFunction('storage.session.getBytesInUse'),
      set: notMockedFunction('storage.session.set'),
      remove: notMockedFunction('storage.session.remove'),
      clear: notMockedFunction('storage.session.clear'),
      setAccessLevel: notMockedFunction('storage.session.setAccessLevel'),
      onChanged: notMockedEventWithRules('storage.session.onChanged'),
      QUOTA_BYTES: 10485760,
    },
    // Events
    onChanged: notMockedEventWithRules('storage.onChanged'),
  },
  tabs: {
    // Constants
    TAB_ID_NONE: -1,
    MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND: 2,
    SPLIT_VIEW_ID_NONE: -1,
    TAB_INDEX_NONE: -1,
    // Enums
    MutedInfoReason: emptyEnum(),
    TabStatus: emptyEnum(),
    WindowType: emptyEnum(),
    ZoomSettingsMode: emptyEnum(),
    ZoomSettingsScope: emptyEnum(),
    // Functions
    captureVisibleTab: notMockedFunction('tabs.captureVisibleTab'),
    connect: notMockedFunction('tabs.connect'),
    create: notMockedFunction('tabs.create'),
    detectLanguage: notMockedFunction('tabs.detectLanguage'),
    discard: notMockedFunction('tabs.discard'),
    duplicate: notMockedFunction('tabs.duplicate'),
    executeScript: notMockedFunction('tabs.executeScript'),
    get: notMockedFunction('tabs.get'),
    getAllInWindow: notMockedFunction('tabs.getAllInWindow'),
    getCurrent: notMockedFunction('tabs.getCurrent'),
    getSelected: notMockedFunction('tabs.getSelected'),
    getZoom: notMockedFunction('tabs.getZoom'),
    getZoomSettings: notMockedFunction('tabs.getZoomSettings'),
    goBack: notMockedFunction('tabs.goBack'),
    goForward: notMockedFunction('tabs.goForward'),
    group: notMockedFunction('tabs.group'),
    highlight: notMockedFunction('tabs.highlight'),
    insertCSS: notMockedFunction('tabs.insertCSS'),
    move: notMockedFunction('tabs.move'),
    query: notMockedFunction('tabs.query'),
    reload: notMockedFunction('tabs.reload'),
    remove: notMockedFunction('tabs.remove'),
    sendMessage: notMockedFunction('tabs.sendMessage'),
    sendRequest: notMockedFunction('tabs.sendRequest'),
    setZoom: notMockedFunction('tabs.setZoom'),
    setZoomSettings: notMockedFunction('tabs.setZoomSettings'),
    ungroup: notMockedFunction('tabs.ungroup'),
    update: notMockedFunction('tabs.update'),
    // Events
    onActivated: notMockedEventWithRules('tabs.onActivated'),
    onAttached: notMockedEventWithRules('tabs.onAttached'),
    onCreated: notMockedEventWithRules('tabs.onCreated'),
    onDetached: notMockedEventWithRules('tabs.onDetached'),
    onHighlighted: notMockedEventWithRules('tabs.onHighlighted'),
    onMoved: notMockedEventWithRules('tabs.onMoved'),
    onRemoved: notMockedEventWithRules('tabs.onRemoved'),
    onReplaced: notMockedEventWithRules('tabs.onReplaced'),
    onUpdated: notMockedEventWithRules('tabs.onUpdated'),
    onZoomChange: notMockedEventWithRules('tabs.onZoomChange'),
    onSelectionChanged: notMockedEventWithRules('tabs.onSelectionChanged'),
    onActiveChanged: notMockedEventWithRules('tabs.onActiveChanged'),
    onHighlightChanged: notMockedEventWithRules('tabs.onHighlightChanged'),
  },
  topSites: {
    // Functions
    get: notMockedFunction('topSites.get'),
  },
  tts: {
    // Enums
    EventType: emptyEnum(),
    VoiceGender: emptyEnum(),
    // Functions
    getVoices: notMockedFunction('tts.getVoices'),
    isSpeaking: notMockedFunction('tts.isSpeaking'),
    pause: notMockedFunction('tts.pause'),
    resume: notMockedFunction('tts.resume'),
    speak: notMockedFunction('tts.speak'),
    stop: notMockedFunction('tts.stop'),
    // Events
    onVoicesChanged: notMockedEventWithRules('tts.onVoicesChanged'),
  },
  webNavigation: {
    // Enums
    TransitionQualifier: emptyEnum(),
    TransitionType: emptyEnum(),
    // Functions
    getAllFrames: notMockedFunction('webNavigation.getAllFrames'),
    getFrame: notMockedFunction('webNavigation.getFrame'),
    // Events
    onBeforeNavigate: notMockedEventWithRules('webNavigation.onBeforeNavigate'),
    onCommitted: notMockedEventWithRules('webNavigation.onCommitted'),
    onCompleted: notMockedEventWithRules('webNavigation.onCompleted'),
    onCreatedNavigationTarget: notMockedEventWithRules('webNavigation.onCreatedNavigationTarget'),
    onDOMContentLoaded: notMockedEventWithRules('webNavigation.onDOMContentLoaded'),
    onErrorOccurred: notMockedEventWithRules('webNavigation.onErrorOccurred'),
    onHistoryStateUpdated: notMockedEventWithRules('webNavigation.onHistoryStateUpdated'),
    onReferenceFragmentUpdated: notMockedEventWithRules('webNavigation.onReferenceFragmentUpdated'),
    onTabReplaced: notMockedEventWithRules('webNavigation.onTabReplaced'),
  },
  webRequest: {
    // Constants
    MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: 20,
    // Enums
    IgnoredActionType: emptyEnum(),
    OnAuthRequiredOptions: emptyEnum(),
    OnBeforeRedirectOptions: emptyEnum(),
    OnBeforeRequestOptions: emptyEnum(),
    OnBeforeSendHeadersOptions: emptyEnum(),
    OnCompletedOptions: emptyEnum(),
    OnHeadersReceivedOptions: emptyEnum(),
    OnResponseStartedOptions: emptyEnum(),
    OnSendHeadersOptions: emptyEnum(),
    OnErrorOccurredOptions: emptyEnum(),
    ResourceType: emptyEnum(),
    // Functions
    handlerBehaviorChanged: notMockedFunction('webRequest.handlerBehaviorChanged'),
    // Events
    onAuthRequired: notMockedEventWithRules('webRequest.onAuthRequired'),
    onBeforeRedirect: notMockedEventWithRules('webRequest.onBeforeRedirect'),
    onBeforeRequest: notMockedEventWithRules('webRequest.onBeforeRequest'),
    onBeforeSendHeaders: notMockedEventWithRules('webRequest.onBeforeSendHeaders'),
    onCompleted: notMockedEventWithRules('webRequest.onCompleted'),
    onErrorOccurred: notMockedEventWithRules('webRequest.onErrorOccurred'),
    onHeadersReceived: notMockedEventWithRules('webRequest.onHeadersReceived'),
    onResponseStarted: notMockedEventWithRules('webRequest.onResponseStarted'),
    onSendHeaders: notMockedEventWithRules('webRequest.onSendHeaders'),
    onActionIgnored: notMockedEventWithRules('webRequest.onActionIgnored'),
  },
  windows: {
    // Constants
    WINDOW_ID_CURRENT: -2,
    WINDOW_ID_NONE: -1,
    // Enums
    CreateType: emptyEnum(),
    WindowState: emptyEnum(),
    WindowType: emptyEnum(),
    // Functions
    create: notMockedFunction('windows.create'),
    get: notMockedFunction('windows.get'),
    getAll: notMockedFunction('windows.getAll'),
    getCurrent: notMockedFunction('windows.getCurrent'),
    getLastFocused: notMockedFunction('windows.getLastFocused'),
    remove: notMockedFunction('windows.remove'),
    update: notMockedFunction('windows.update'),
    // Events
    onCreated: notMockedEventWithRules('windows.onCreated'),
    onFocusChanged: notMockedEventWithRules('windows.onFocusChanged'),
    onRemoved: notMockedEventWithRules('windows.onRemoved'),
    onBoundsChanged: notMockedEventWithRules('windows.onBoundsChanged'),
  },
  fontSettings: {
    // Enums
    GenericFamily: emptyEnum(),
    LevelOfControl: emptyEnum(),
    ScriptCode: emptyEnum(),
    // Functions
    clearFont: notMockedFunction('fontSettings.clearFont'),
    clearDefaultFixedFontSize: notMockedFunction('fontSettings.clearDefaultFixedFontSize'),
    clearDefaultFontSize: notMockedFunction('fontSettings.clearDefaultFontSize'),
    clearMinimumFontSize: notMockedFunction('fontSettings.clearMinimumFontSize'),
    getDefaultFixedFontSize: notMockedFunction('fontSettings.getDefaultFixedFontSize'),
    getDefaultFontSize: notMockedFunction('fontSettings.getDefaultFontSize'),
    getFont: notMockedFunction('fontSettings.getFont'),
    getFontList: notMockedFunction('fontSettings.getFontList'),
    getMinimumFontSize: notMockedFunction('fontSettings.getMinimumFontSize'),
    setDefaultFixedFontSize: notMockedFunction('fontSettings.setDefaultFixedFontSize'),
    setDefaultFontSize: notMockedFunction('fontSettings.setDefaultFontSize'),
    setFont: notMockedFunction('fontSettings.setFont'),
    setMinimumFontSize: notMockedFunction('fontSettings.setMinimumFontSize'),
    // Events
    onDefaultFixedFontSizeChanged: notMockedEventWithRules(
      'fontSettings.onDefaultFixedFontSizeChanged',
    ),
    onDefaultFontSizeChanged: notMockedEventWithRules('fontSettings.onDefaultFontSizeChanged'),
    onFontChanged: notMockedEventWithRules('fontSettings.onFontChanged'),
    onMinimumFontSizeChanged: notMockedEventWithRules('fontSettings.onMinimumFontSizeChanged'),
  },
  gcm: {
    // Constants
    MAX_MESSAGE_SIZE: 4096,
    // Functions
    register: notMockedFunction('gcm.register'),
    unregister: notMockedFunction('gcm.unregister'),
    send: notMockedFunction('gcm.send'),
    // Events
    onMessage: notMockedEventWithRules('gcm.onMessage'),
    onMessagesDeleted: notMockedEventWithRules('gcm.onMessagesDeleted'),
    onSendError: notMockedEventWithRules('gcm.onSendError'),
  },
  instanceID: {
    // Functions
    deleteID: notMockedFunction('instanceID.deleteID'),
    deleteToken: notMockedFunction('instanceID.deleteToken'),
    getCreationTime: notMockedFunction('instanceID.getCreationTime'),
    getID: notMockedFunction('instanceID.getID'),
    getToken: notMockedFunction('instanceID.getToken'),
    // Events
    onTokenRefresh: notMockedEventWithRules('instanceID.onTokenRefresh'),
  },
  loginState: {
    // Enums
    ProfileType: emptyEnum(),
    SessionState: emptyEnum(),
    // Functions
    getProfileType: notMockedFunction('loginState.getProfileType'),
    getSessionState: notMockedFunction('loginState.getSessionState'),
    // Events
    onSessionStateChanged: notMockedEventWithRules('loginState.onSessionStateChanged'),
  },
  offscreen: {
    // Enums
    Reason: emptyEnum(),
    // Functions
    createDocument: notMockedFunction('offscreen.createDocument'),
    closeDocument: notMockedFunction('offscreen.closeDocument'),
    hasDocument: notMockedFunction('offscreen.hasDocument'),
  },
  tabGroups: {
    // Constants
    TAB_GROUP_ID_NONE: -1,
    // Enums
    Color: emptyEnum(),
    // Functions
    get: notMockedFunction('tabGroups.get'),
    move: notMockedFunction('tabGroups.move'),
    query: notMockedFunction('tabGroups.query'),
    update: notMockedFunction('tabGroups.update'),
    // Events
    onCreated: notMockedEventWithRules('tabGroups.onCreated'),
    onMoved: notMockedEventWithRules('tabGroups.onMoved'),
    onRemoved: notMockedEventWithRules('tabGroups.onRemoved'),
    onUpdated: notMockedEventWithRules('tabGroups.onUpdated'),
  },
  userScripts: {
    // Enums
    ExecutionWorld: emptyEnum(),
    // Functions
    register: notMockedFunction('userScripts.register'),
    unregister: notMockedFunction('userScripts.unregister'),
    update: notMockedFunction('userScripts.update'),
    getScripts: notMockedFunction('userScripts.getScripts'),
    configureWorld: notMockedFunction('userScripts.configureWorld'),
    resetWorldConfiguration: notMockedFunction('userScripts.resetWorldConfiguration'),
    getWorldConfigurations: notMockedFunction('userScripts.getWorldConfigurations'),
    execute: notMockedFunction('userScripts.execute'),
  },
  vpnProvider: {
    // Enums
    PlatformMessage: emptyEnum(),
    UIEvent: emptyEnum(),
    VpnConnectionState: emptyEnum(),
    // Functions
    createConfig: notMockedFunction('vpnProvider.createConfig'),
    destroyConfig: notMockedFunction('vpnProvider.destroyConfig'),
    notifyConnectionStateChanged: notMockedFunction('vpnProvider.notifyConnectionStateChanged'),
    sendPacket: notMockedFunction('vpnProvider.sendPacket'),
    setParameters: notMockedFunction('vpnProvider.setParameters'),
    // Events
    onConfigRemoved: notMockedEventWithRules('vpnProvider.onConfigRemoved'),
    onConfigCreated: notMockedEventWithRules('vpnProvider.onConfigCreated'),
    onPacketReceived: notMockedEventWithRules('vpnProvider.onPacketReceived'),
    onPlatformMessage: notMockedEventWithRules('vpnProvider.onPlatformMessage'),
    onUIEvent: notMockedEventWithRules('vpnProvider.onUIEvent'),
  },
  webAuthenticationProxy: {
    // Functions
    attach: notMockedFunction('webAuthenticationProxy.attach'),
    detach: notMockedFunction('webAuthenticationProxy.detach'),
    completeCreateRequest: notMockedFunction('webAuthenticationProxy.completeCreateRequest'),
    completeGetRequest: notMockedFunction('webAuthenticationProxy.completeGetRequest'),
    completeIsUvpaaRequest: notMockedFunction('webAuthenticationProxy.completeIsUvpaaRequest'),
    // Events
    onCreateRequest: notMockedEventWithRules('webAuthenticationProxy.onCreateRequest'),
    onGetRequest: notMockedEventWithRules('webAuthenticationProxy.onGetRequest'),
    onIsUvpaaRequest: notMockedEventWithRules('webAuthenticationProxy.onIsUvpaaRequest'),
    onRemoteSessionStateChange: notMockedEventWithRules(
      'webAuthenticationProxy.onRemoteSessionStateChange',
    ),
    onRequestCanceled: notMockedEventWithRules('webAuthenticationProxy.onRequestCanceled'),
  },
  ttsEngine: {
    // Enums
    LanguageInstallStatus: emptyEnum(),
    TtsClientSource: emptyEnum(),
    VoiceGender: emptyEnum(),
    // Functions
    updateVoices: notMockedFunction('ttsEngine.updateVoices'),
    updateLanguage: notMockedFunction('ttsEngine.updateLanguage'),
    // Events
    onSpeak: notMockedEventWithRules('ttsEngine.onSpeak'),
    onStop: notMockedEventWithRules('ttsEngine.onStop'),
    onPause: notMockedEventWithRules('ttsEngine.onPause'),
    onResume: notMockedEventWithRules('ttsEngine.onResume'),
    onInstallLanguageRequest: notMockedEventWithRules('ttsEngine.onInstallLanguageRequest'),
    onLanguageStatusRequest: notMockedEventWithRules('ttsEngine.onLanguageStatusRequest'),
    onSpeakWithAudioStream: notMockedEventWithRules('ttsEngine.onSpeakWithAudioStream'),
    onUninstallLanguageRequest: notMockedEventWithRules('ttsEngine.onUninstallLanguageRequest'),
  },
  system: {
    cpu: {
      // Functions
      getInfo: notMockedFunction('system.cpu.getInfo'),
    },
    memory: {
      // Functions
      getInfo: notMockedFunction('system.memory.getInfo'),
    },
    storage: {
      // Enums
      EjectDeviceResultCode: emptyEnum(),
      StorageUnitType: emptyEnum(),
      // Functions
      getInfo: notMockedFunction('system.storage.getInfo'),
      ejectDevice: notMockedFunction('system.storage.ejectDevice'),
      getAvailableCapacity: notMockedFunction('system.storage.getAvailableCapacity'),
      // Events
      onAttached: notMockedEventWithRules('system.storage.onAttached'),
      onDetached: notMockedEventWithRules('system.storage.onDetached'),
    },
    display: {
      // Enums
      LayoutPosition: emptyEnum(),
      MirrorMode: emptyEnum(),
      ActiveState: emptyEnum(),
      // Functions
      getInfo: notMockedFunction('system.display.getInfo'),
      getDisplayLayout: notMockedFunction('system.display.getDisplayLayout'),
      setDisplayLayout: notMockedFunction('system.display.setDisplayLayout'),
      setDisplayProperties: notMockedFunction('system.display.setDisplayProperties'),
      showNativeTouchCalibration: notMockedFunction('system.display.showNativeTouchCalibration'),
      clearTouchCalibration: notMockedFunction('system.display.clearTouchCalibration'),
      enableUnifiedDesktop: notMockedFunction('system.display.enableUnifiedDesktop'),
      overscanCalibrationStart: notMockedFunction('system.display.overscanCalibrationStart'),
      overscanCalibrationAdjust: notMockedFunction('system.display.overscanCalibrationAdjust'),
      overscanCalibrationReset: notMockedFunction('system.display.overscanCalibrationReset'),
      overscanCalibrationComplete: notMockedFunction('system.display.overscanCalibrationComplete'),
      startCustomTouchCalibration: notMockedFunction('system.display.startCustomTouchCalibration'),
      completeCustomTouchCalibration: notMockedFunction(
        'system.display.completeCustomTouchCalibration',
      ),
      setMirrorMode: notMockedFunction('system.display.setMirrorMode'),
      // Events
      onDisplayChanged: notMockedEventWithRules('system.display.onDisplayChanged'),
    },
  },
  printing: {
    // Constants
    MAX_GET_PRINTER_INFO_CALLS_PER_MINUTE: 20 as const,
    MAX_SUBMIT_JOB_CALLS_PER_MINUTE: 40 as const,
    // Enums
    JobStatus: emptyEnum(),
    PrinterSource: emptyEnum(),
    PrinterStatus: emptyEnum(),
    SubmitJobStatus: emptyEnum(),
    // Functions
    getPrinters: notMockedFunction('printing.getPrinters'),
    getPrinterInfo: notMockedFunction('printing.getPrinterInfo'),
    submitJob: notMockedFunction('printing.submitJob'),
    cancelJob: notMockedFunction('printing.cancelJob'),
    getJobStatus: notMockedFunction('printing.getJobStatus'),
    // Events
    onJobStatusChanged: notMockedEventWithRules('printing.onJobStatusChanged'),
  },
  printingMetrics: {
    // Enums
    ColorMode: emptyEnum(),
    DuplexMode: emptyEnum(),
    PrinterSource: emptyEnum(),
    PrintJobStatus: emptyEnum(),
    PrintJobSource: emptyEnum(),
    // Functions
    getPrintJobs: notMockedFunction('printingMetrics.getPrintJobs'),
    // Events
    onPrintJobFinished: notMockedEventWithRules('printingMetrics.onPrintJobFinished'),
  },
  printerProvider: {
    // Enums
    PrintError: emptyEnum(),
    // Events
    onGetPrintersRequested: notMockedEventWithRules('printerProvider.onGetPrintersRequested'),
    onGetUsbPrinterInfoRequested: notMockedEventWithRules(
      'printerProvider.onGetUsbPrinterInfoRequested',
    ),
    onGetCapabilityRequested: notMockedEventWithRules('printerProvider.onGetCapabilityRequested'),
    onPrintRequested: notMockedEventWithRules('printerProvider.onPrintRequested'),
  },
  wallpaper: {
    // Enums
    WallpaperLayout: emptyEnum(),
    // Functions
    setWallpaper: notMockedFunction('wallpaper.setWallpaper'),
  },
  fileBrowserHandler: {
    // Events
    onExecute: notMockedEventWithRules('fileBrowserHandler.onExecute'),
  },
  fileSystemProvider: {
    // Enums
    ChangeType: emptyEnum(),
    OpenFileMode: emptyEnum(),
    CommonActionId: emptyEnum(),
    ProviderError: emptyEnum(),
    // Functions
    mount: notMockedFunction('fileSystemProvider.mount'),
    unmount: notMockedFunction('fileSystemProvider.unmount'),
    getAll: notMockedFunction('fileSystemProvider.getAll'),
    get: notMockedFunction('fileSystemProvider.get'),
    notify: notMockedFunction('fileSystemProvider.notify'),
    // Events
    onUnmountRequested: notMockedEventWithRules('fileSystemProvider.onUnmountRequested'),
    onGetMetadataRequested: notMockedEventWithRules('fileSystemProvider.onGetMetadataRequested'),
    onGetActionsRequested: notMockedEventWithRules('fileSystemProvider.onGetActionsRequested'),
    onReadDirectoryRequested: notMockedEventWithRules(
      'fileSystemProvider.onReadDirectoryRequested',
    ),
    onOpenFileRequested: notMockedEventWithRules('fileSystemProvider.onOpenFileRequested'),
    onCloseFileRequested: notMockedEventWithRules('fileSystemProvider.onCloseFileRequested'),
    onReadFileRequested: notMockedEventWithRules('fileSystemProvider.onReadDirectoryRequested'), // wait, ReadFile
    onWriteFileRequested: notMockedEventWithRules('fileSystemProvider.onWriteFileRequested'),
    onTruncateRequested: notMockedEventWithRules('fileSystemProvider.onTruncateRequested'),
    onDeleteEntryRequested: notMockedEventWithRules('fileSystemProvider.onDeleteEntryRequested'),
    onCreateDirectoryRequested: notMockedEventWithRules(
      'fileSystemProvider.onCreateDirectoryRequested',
    ),
    onCreateFileRequested: notMockedEventWithRules('fileSystemProvider.onCreateFileRequested'),
    onCopyEntryRequested: notMockedEventWithRules('fileSystemProvider.onCopyEntryRequested'),
    onMoveEntryRequested: notMockedEventWithRules('fileSystemProvider.onMoveEntryRequested'),
    onAddWatcherRequested: notMockedEventWithRules('fileSystemProvider.onAddWatcherRequested'),
    onRemoveWatcherRequested: notMockedEventWithRules(
      'fileSystemProvider.onRemoveWatcherRequested',
    ),
    onConfigureRequested: notMockedEventWithRules('fileSystemProvider.onConfigureRequested'),
    onMountRequested: notMockedEventWithRules('fileSystemProvider.onMountRequested'),
    onExecuteActionRequested: notMockedEventWithRules(
      'fileSystemProvider.onExecuteActionRequested',
    ),
    onAbortRequested: notMockedEventWithRules('fileSystemProvider.onAbortRequested'),
  },
  declarativeWebRequest: {
    // Enums
    Stage: emptyEnum(),
    // Events
    onRequest: notMockedEventWithRules('declarativeWebRequest.onRequest'),
    onMessage: notMockedEventWithRules('declarativeWebRequest.onMessage'),
  },
  documentScan: {
    // Enums
    Configurability: emptyEnum(),
    ConnectionType: emptyEnum(),
    ConstraintType: emptyEnum(),
    OperationResult: emptyEnum(),
    OptionType: emptyEnum(),
    OptionUnit: emptyEnum(),
    // Functions
    scan: notMockedFunction('documentScan.scan'),
    cancelScan: notMockedFunction('documentScan.cancelScan'),
    closeScanner: notMockedFunction('documentScan.closeScanner'),
    getOptionGroups: notMockedFunction('documentScan.getOptionGroups'),
    getScannerList: notMockedFunction('documentScan.getScannerList'),
    openScanner: notMockedFunction('documentScan.openScanner'),
    readScanData: notMockedFunction('documentScan.readScanData'),
    setOptions: notMockedFunction('documentScan.setOptions'),
    startScan: notMockedFunction('documentScan.startScan'),
  },
  dom: {
    openOrClosedShadowRoot: notMockedFunction('dom.openOrClosedShadowRoot'),
  },
  enterprise: {
    deviceAttributes: {
      // Functions
      getDirectoryDeviceId: notMockedFunction('enterprise.deviceAttributes.getDirectoryDeviceId'),
      getDeviceSerialNumber: notMockedFunction('enterprise.deviceAttributes.getDeviceSerialNumber'),
      getDeviceAssetId: notMockedFunction('enterprise.deviceAttributes.getDeviceAssetId'),
      getDeviceAnnotatedLocation: notMockedFunction(
        'enterprise.deviceAttributes.getDeviceAnnotatedLocation',
      ),
      getDeviceHostname: notMockedFunction('enterprise.deviceAttributes.getDeviceHostname'),
    },
    platformKeys: {
      // Enums
      Algorithm: emptyEnum(),
      Scope: emptyEnum(),
      // Functions
      getTokens: notMockedFunction('enterprise.platformKeys.getTokens'),
      getCertificates: notMockedFunction('enterprise.platformKeys.getCertificates'),
      importCertificate: notMockedFunction('enterprise.platformKeys.importCertificate'),
      removeCertificate: notMockedFunction('enterprise.platformKeys.removeCertificate'),
      challengeMachineKey: notMockedFunction('enterprise.platformKeys.challengeMachineKey'),
      challengeUserKey: notMockedFunction('enterprise.platformKeys.challengeUserKey'),
      challengeKey: notMockedFunction('enterprise.platformKeys.challengeKey'),
    },
    networkingAttributes: {
      // Functions
      getNetworkDetails: notMockedFunction('enterprise.networkingAttributes.getNetworkDetails'),
    },
    hardwarePlatform: {
      // Functions
      getHardwarePlatformInfo: notMockedFunction(
        'enterprise.hardwarePlatform.getHardwarePlatformInfo',
      ),
    },
    login: {
      // Functions
      exitCurrentManagedGuestSession: notMockedFunction(
        'enterprise.login.exitCurrentManagedGuestSession',
      ),
    },
  },
  pageCapture: {
    // Functions
    saveAsMHTML: notMockedFunction('pageCapture.saveAsMHTML'),
  },
  privacy: {
    // Enums
    IPHandlingPolicy: emptyEnum(),
    network: {
      networkPredictionEnabled: notMockedChromeSetting('privacy.network.networkPredictionEnabled'),
      webRTCIPHandlingPolicy: notMockedChromeSetting('privacy.network.webRTCIPHandlingPolicy'),
    },
    services: {
      alternateErrorPagesEnabled: notMockedChromeSetting(
        'privacy.services.alternateErrorPagesEnabled',
      ),
      autofillEnabled: notMockedChromeSetting('privacy.services.autofillEnabled'),
      autofillAddressEnabled: notMockedChromeSetting('privacy.services.autofillAddressEnabled'),
      autofillCreditCardEnabled: notMockedChromeSetting(
        'privacy.services.autofillCreditCardEnabled',
      ),
      passwordSavingEnabled: notMockedChromeSetting('privacy.services.passwordSavingEnabled'),
      safeBrowsingEnabled: notMockedChromeSetting('privacy.services.safeBrowsingEnabled'),
      safeBrowsingExtendedReportingEnabled: notMockedChromeSetting(
        'privacy.services.safeBrowsingExtendedReportingEnabled',
      ),
      searchSuggestEnabled: notMockedChromeSetting('privacy.services.searchSuggestEnabled'),
      spellingServiceEnabled: notMockedChromeSetting('privacy.services.spellingServiceEnabled'),
      translationServiceEnabled: notMockedChromeSetting(
        'privacy.services.translationServiceEnabled',
      ),
    },
    websites: {
      adMeasurementEnabled: notMockedChromeSetting('privacy.websites.adMeasurementEnabled'),
      fledgeEnabled: notMockedChromeSetting('privacy.websites.fledgeEnabled'),
      hyperlinkAuditingEnabled: notMockedChromeSetting('privacy.websites.hyperlinkAuditingEnabled'),
      referrersEnabled: notMockedChromeSetting('privacy.websites.referrersEnabled'),
      doNotTrackEnabled: notMockedChromeSetting('privacy.websites.doNotTrackEnabled'),
      protectedContentEnabled: notMockedChromeSetting('privacy.websites.protectedContentEnabled'),
      thirdPartyCookiesAllowed: notMockedChromeSetting('privacy.websites.thirdPartyCookiesAllowed'),
      topicsEnabled: notMockedChromeSetting('privacy.websites.topicsEnabled'),
      relatedWebsiteSetsEnabled: notMockedChromeSetting(
        'privacy.websites.relatedWebsiteSetsEnabled',
      ),
    },
  },
  sidePanel: {
    // Enums
    Side: emptyEnum(),
    // Functions
    getOptions: notMockedFunction('sidePanel.getOptions'),
    setOptions: notMockedFunction('sidePanel.setOptions'),
    getPanelBehavior: notMockedFunction('sidePanel.getPanelBehavior'),
    setPanelBehavior: notMockedFunction('sidePanel.setPanelBehavior'),
    open: notMockedFunction('sidePanel.open'),
    close: notMockedFunction('sidePanel.close'),
    getLayout: notMockedFunction('sidePanel.getLayout'),
    // Events
    onClosed: notMockedEventWithRules('sidePanel.onClosed'),
    onOpened: notMockedEventWithRules('sidePanel.onOpened'),
  },
  input: {
    ime: {
      // Enums
      AssistiveWindowType: emptyEnum(),
      AssistiveWindowButton: emptyEnum(),
      MouseButton: emptyEnum(),
      KeyboardEventType: emptyEnum(),
      AutoCapitalizeType: emptyEnum(),
      InputContextType: emptyEnum(),
      MenuItemStyle: emptyEnum(),
      ScreenType: emptyEnum(),
      UnderlineStyle: emptyEnum(),
      WindowPosition: emptyEnum(),
      // Functions
      setComposition: notMockedFunction('input.ime.setComposition'),
      clearComposition: notMockedFunction('input.ime.clearComposition'),
      commitText: notMockedFunction('input.ime.commitText'),
      sendKeyEvents: notMockedFunction('input.ime.sendKeyEvents'),
      hideInputView: notMockedFunction('input.ime.hideInputView'),
      setCandidateWindowProperties: notMockedFunction('input.ime.setCandidateWindowProperties'),
      setCandidates: notMockedFunction('input.ime.setCandidates'),
      setCursorPosition: notMockedFunction('input.ime.setCursorPosition'),
      setMenuItems: notMockedFunction('input.ime.setMenuItems'),
      updateMenuItems: notMockedFunction('input.ime.updateMenuItems'),
      deleteSurroundingText: notMockedFunction('input.ime.deleteSurroundingText'),
      keyEventHandled: notMockedFunction('input.ime.keyEventHandled'),
      setAssistiveWindowProperties: notMockedFunction('input.ime.setAssistiveWindowProperties'),
      setAssistiveWindowButtonHighlighted: notMockedFunction(
        'input.ime.setAssistiveWindowButtonHighlighted',
      ),
      // Events
      onActivate: notMockedEventWithRules('input.ime.onActivate'),
      onDeactivated: notMockedEventWithRules('input.ime.onDeactivated'),
      onFocus: notMockedEventWithRules('input.ime.onFocus'),
      onBlur: notMockedEventWithRules('input.ime.onBlur'),
      onInputContextUpdate: notMockedEventWithRules('input.ime.onInputContextUpdate'),
      onKeyEvent: notMockedEventWithRules('input.ime.onKeyEvent'),
      onCandidateClicked: notMockedEventWithRules('input.ime.onCandidateClicked'),
      onMenuItemActivated: notMockedEventWithRules('input.ime.onMenuItemActivated'),
      onSurroundingTextChanged: notMockedEventWithRules('input.ime.onSurroundingTextChanged'),
      onReset: notMockedEventWithRules('input.ime.onReset'),
      onAssistiveWindowButtonClicked: notMockedEventWithRules(
        'input.ime.onAssistiveWindowButtonClicked',
      ),
    },
  },
  platformKeys: {
    // Enums
    ClientCertificateType: emptyEnum(),
    // Functions
    selectClientCertificates: notMockedFunction('platformKeys.selectClientCertificates'),
    getKeyPair: notMockedFunction('platformKeys.getKeyPair'),
    getKeyPairBySpki: notMockedFunction('platformKeys.getKeyPairBySpki'),
    subtleCrypto: notMockedFunction('platformKeys.subtleCrypto'),
    verifyTLSServerCertificate: notMockedFunction('platformKeys.verifyTLSServerCertificate'),
  },
  power: {
    // Enums
    Level: emptyEnum(),
    // Functions
    requestKeepAwake: notMockedFunction('power.requestKeepAwake'),
    releaseKeepAwake: notMockedFunction('power.releaseKeepAwake'),
    reportActivity: notMockedFunction('power.reportActivity'),
  },
  readingList: {
    // Functions
    addEntry: notMockedFunction('readingList.addEntry'),
    removeEntry: notMockedFunction('readingList.removeEntry'),
    updateEntry: notMockedFunction('readingList.updateEntry'),
    query: notMockedFunction('readingList.query'),
    // Events
    onEntryAdded: notMockedEventWithRules('readingList.onEntryAdded'),
    onEntryRemoved: notMockedEventWithRules('readingList.onEntryRemoved'),
    onEntryUpdated: notMockedEventWithRules('readingList.onEntryUpdated'),
  },
  systemLog: {
    // Functions
    add: notMockedFunction('systemLog.add'),
  },
  tabCapture: {
    // Enums
    TabCaptureState: emptyEnum(),
    // Functions
    capture: notMockedFunction('tabCapture.capture'),
    getCapturedTabs: notMockedFunction('tabCapture.getCapturedTabs'),
    getMediaStreamId: notMockedFunction('tabCapture.getMediaStreamId'),
    // Events
    onStatusChanged: notMockedEventWithRules('tabCapture.onStatusChanged'),
  },
};
