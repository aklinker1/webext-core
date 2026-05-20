import { BrowserOverrides } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

export const webNavigation: BrowserOverrides['webNavigation'] = {
  onBeforeNavigate: defineEventWithTrigger(),
  onCommitted: defineEventWithTrigger(),
  onCompleted: defineEventWithTrigger(),
  onCreatedNavigationTarget: defineEventWithTrigger(),
  onDOMContentLoaded: defineEventWithTrigger(),
  onErrorOccurred: defineEventWithTrigger(),
  onHistoryStateUpdated: defineEventWithTrigger(),
  onReferenceFragmentUpdated: defineEventWithTrigger(),
  onTabReplaced: defineEventWithTrigger(),
};
