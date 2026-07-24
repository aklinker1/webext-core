export type { ExtensionStorage } from './types';

import { defineExtensionStorage } from './defineExtensionStorage';

export { defineExtensionStorage };

/** An implementation of `ExtensionStorage` based on the `chrome.storage.local` storage area. */
export const localExtStorage = defineExtensionStorage(chrome.storage.local);
/**
 * An implementation of `ExtensionStorage` based on the `chrome.storage.local` storage area.
 *
 * - Added to Chrome 102 as of May 24th, 2022.
 * - Added to Safari 16.4 as of March 27th, 2023.
 * - Added to Firefox 115 as of July 4th, 2023.
 */
export const sessionExtStorage = defineExtensionStorage(chrome.storage.session);
/** An implementation of `ExtensionStorage` based on the `chrome.storage.sync` storage area. */
export const syncExtStorage = defineExtensionStorage(chrome.storage.sync);
/** An implementation of `ExtensionStorage` based on the `chrome.storage.managed` storage area. */
export const managedExtStorage = defineExtensionStorage(chrome.storage.managed);
