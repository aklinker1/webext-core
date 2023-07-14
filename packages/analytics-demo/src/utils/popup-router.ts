import { createRouter, createWebHashHistory } from 'vue-router';

export const popupRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../components/Page.vue'),
    },
    {
      path: '/page-2',
      component: () => import('../components/Page.vue'),
    },
    {
      path: '/page-3',
      component: () => import('../components/Page.vue'),
    },
  ],
});
