export type { ExtensionStorage } from './types';
import { defineExtensionStorage } from './defineExtensionStorage';
import Browser from 'webextension-polyfill';

export { defineExtensionStorage };

export const localExtStorage = defineExtensionStorage(Browser.storage.local);
export const syncExtStorage = defineExtensionStorage(Browser.storage.sync);
export const managedExtStorage = defineExtensionStorage(Browser.storage.managed);
