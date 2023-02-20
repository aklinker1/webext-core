import { describe, it, expect, beforeEach } from 'vitest';
import { fakeBrowser } from '..';

describe('webNavigation', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('should properly overwrite onBeforeNavigate, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onBeforeNavigate.trigger).toBeDefined();
  });

  it('should properly overwrite onCommitted, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onCommitted.trigger).toBeDefined();
  });

  it('should properly overwrite onCompleted, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onCompleted.trigger).toBeDefined();
  });

  it('should properly overwrite onCreatedNavigationTarget, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onCreatedNavigationTarget.trigger).toBeDefined();
  });

  it('should properly overwrite onDOMContentLoaded, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onDOMContentLoaded.trigger).toBeDefined();
  });

  it('should properly overwrite onErrorOccurred, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onErrorOccurred.trigger).toBeDefined();
  });

  it('should properly overwrite onHistoryStateUpdated, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onHistoryStateUpdated.trigger).toBeDefined();
  });

  it('should properly overwrite onReferenceFragmentUpdated, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onReferenceFragmentUpdated.trigger).toBeDefined();
  });

  it('should properly overwrite onTabReplaced, adding the trigger method', () => {
    expect(fakeBrowser.webNavigation.onTabReplaced.trigger).toBeDefined();
  });
});
