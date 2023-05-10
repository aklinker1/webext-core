export type { ExtensionStorage } from './types';
import { defineExtensionStorage } from './defineExtensionStorage';
import Browser from 'webextension-polyfill';

export { defineExtensionStorage };

/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.local` storage area.
 */
export const localExtStorage = defineExtensionStorage(Browser.storage.local);
/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.sync` storage area.
 */
export const syncExtStorage = defineExtensionStorage(Browser.storage.sync);
/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.managed` storage area.
 */
export const managedExtStorage = defineExtensionStorage(Browser.storage.managed);
