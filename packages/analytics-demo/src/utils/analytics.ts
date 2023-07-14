import { defineExtensionAnalytics, createUmamiClient } from '@webext-core/analytics';

export const [registerAnalytics, getAnalytics] = defineExtensionAnalytics({
  logger: console,
  client: createUmamiClient({
    url: 'https://stats.aklinker1.io',
    websiteId: 'd44e128b-9d3e-4e5b-a340-f0442fcf1d61',
  }),
  isEnabled: () => true,
});
