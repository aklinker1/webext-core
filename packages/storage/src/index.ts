export type { ExtensionStorage } from './types';
import { defineExtensionStorage } from './defineExtensionStorage';
import Browser from 'webextension-polyfill';

export { defineExtensionStorage };

/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.local` storage area.
 */
export const localExtStorage = defineExtensionStorage(Browser.storage.local);
/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.local` storage area.
 *
 * - Added to Chrome 102 as of May 24th, 2022.
 * - Added to Safari 16.4 as of March 27th, 2023.
 * - Added to Firefox 115 as of July 4th, 2023.
 */
export const sessionExtStorage = defineExtensionStorage(Browser.storage.session);
/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.sync` storage area.
 */
export const syncExtStorage = defineExtensionStorage(Browser.storage.sync);
/**
 * An implementation of `ExtensionStorage` based on the `browser.storage.managed` storage area.
 */
export const managedExtStorage = defineExtensionStorage(Browser.storage.managed);
