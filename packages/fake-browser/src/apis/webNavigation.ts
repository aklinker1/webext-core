import { Browser } from '@wxt-dev/browser';

import { EventForTesting } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

export type WebNavigationOverrides = {
  onBeforeNavigate: EventForTesting<
    [details: Browser.webNavigation.WebNavigationBaseCallbackDetails]
  >;
  onCommitted: EventForTesting<
    [details: Browser.webNavigation.WebNavigationTransitionCallbackDetails]
  >;
  onDOMContentLoaded: EventForTesting<
    [details: Browser.webNavigation.WebNavigationFramedCallbackDetails]
  >;
  onCompleted: EventForTesting<[details: Browser.webNavigation.WebNavigationFramedCallbackDetails]>;
  onErrorOccurred: EventForTesting<
    [details: Browser.webNavigation.WebNavigationFramedErrorCallbackDetails]
  >;
  onCreatedNavigationTarget: EventForTesting<
    [details: Browser.webNavigation.WebNavigationSourceCallbackDetails]
  >;
  onReferenceFragmentUpdated: EventForTesting<
    [details: Browser.webNavigation.WebNavigationTransitionCallbackDetails]
  >;
  onTabReplaced: EventForTesting<
    [details: Browser.webNavigation.WebNavigationReplacementCallbackDetails]
  >;
  onHistoryStateUpdated: EventForTesting<
    [details: Browser.webNavigation.WebNavigationTransitionCallbackDetails]
  >;
};

export const webNavigation: WebNavigationOverrides = {
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
