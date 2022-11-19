import Browser from 'webextension-polyfill';

/**
 * Detect whether the code is running in the background (service worker or page)
 */
export function isBackground() {
  // Not in an extension context
  if (!canAccessExtensionApi()) return false;

  const manifest = Browser.runtime.getManifest();
  // There is no background page in the manifest
  if (!manifest.background) return false;

  return manifest.manifest_version === 3 ? isBackgroundServiceWorker() : isBackgroundPage();
}

function canAccessExtensionApi(): boolean {
  return !!Browser.runtime?.id;
}

const KNOWN_BACKGROUND_PAGE_PATHNAMES = [
  // Firefox
  '/_generated_background_page.html',
];

function isBackgroundPage(): boolean {
  return (
    typeof window !== 'undefined' && KNOWN_BACKGROUND_PAGE_PATHNAMES.includes(location.pathname)
  );
}

function isBackgroundServiceWorker(): boolean {
  return typeof window === 'undefined';
}
