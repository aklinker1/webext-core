import { registerAnalytics } from './utils/analytics';

console.log('background.ts');

const analytics = registerAnalytics();
analytics.init('background');
