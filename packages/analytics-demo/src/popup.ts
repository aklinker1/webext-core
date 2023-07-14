import { RouterView } from 'vue-router';
import { createApp } from 'vue';
import { popupRouter } from './utils/popup-router';
import { getAnalytics } from './utils/analytics';

createApp(RouterView).use(popupRouter).mount('body');

const analytics = getAnalytics();
analytics.init('popup');
analytics.trackEvent('opened');

popupRouter.beforeEach(to => {
  analytics.trackPageView(to.path);
});
