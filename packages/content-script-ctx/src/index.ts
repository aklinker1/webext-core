import Browser from 'webextension-polyfill';

type OnInvalidatedListener = () => void;

interface ContentScriptContext {
  isValid: () => boolean;
  onInvalidated: (cb: OnInvalidatedListener) => void;
  setTimeout: typeof window.setTimeout;
  setInterval: typeof window.setInterval;
  requestAnimationFrame: typeof window.requestAnimationFrame;
  addEventListener: <T extends EventTarget>(
    target: T,
    ...args: Parameters<T['addEventListener']>
  ) => void;
}

const INITALIZED_MESSAGE_ID = '@webext-core/content-script-ctx#initialized';

export function defineContentScript(name: string, execute: (ctx: ContentScriptContext) => void) {
  const onInvalidatedListeners: OnInvalidatedListener[] = [];
  let isValidInternal = true;
  const onInvalidated: ContentScriptContext['onInvalidated'] = cb => {
    onInvalidatedListeners.push(cb);
  };

  const setTimeout: ContentScriptContext['setTimeout'] = (...args) => {
    const timeoutId = window.setTimeout(...args);
    onInvalidated(() => clearTimeout(timeoutId));
    return timeoutId;
  };

  const setInterval: ContentScriptContext['setTimeout'] = (...args) => {
    const intervalId = window.setInterval(...args);
    onInvalidated(() => clearInterval(intervalId));
    return intervalId;
  };

  const requestAnimationFrame: ContentScriptContext['requestAnimationFrame'] = cb => {
    const requestId = window.requestAnimationFrame((...args) => {
      if (isValidInternal) cb(...args);
    });
    onInvalidated(() => window.cancelAnimationFrame(requestId));
    return requestId;
  };

  const addEventListener: ContentScriptContext['addEventListener'] = (element, ...args) => {
    // @ts-expect-error: weird types
    element.addEventListener(...args);
    // @ts-expect-error: weird types
    onInvalidated(() => element.removeEventListener(...args));
  };

  const isValid = () => {
    const wasValid = isValidInternal;
    isValidInternal = !!Browser.runtime?.id;
    if (wasValid && !isValidInternal) invalidate();
    return isValidInternal;
  };

  const ctx: ContentScriptContext = {
    isValid,
    onInvalidated,
    setTimeout,
    setInterval,
    requestAnimationFrame,
    addEventListener,
  };

  const invalidate = () => {
    isValidInternal = false;
    onInvalidatedListeners.forEach(listener => listener());
  };

  // Post a message to all the frames to let previous versions of the content script know they're
  // invalidated. Then setup a listener for that same message on the next task so this script
  // listens for future messages.
  const base64Name = btoa(name).replace('==', '');
  window.postMessage({ type: INITALIZED_MESSAGE_ID, nonce: base64Name });
  setTimeout(() => {
    addEventListener(window, 'message', event => {
      const { type, nonce } = (event as MessageEvent).data;
      if (type === INITALIZED_MESSAGE_ID && nonce === base64Name) invalidate();
    });
  });

  // Check to see if the runtime ID exists, if not invalidate
  setInterval(() => {
    if (!Browser.runtime?.id) invalidate();
  }, 1e3);

  execute(ctx);
}
