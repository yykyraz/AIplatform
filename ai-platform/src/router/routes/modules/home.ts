import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const HOME: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.home',
    requiresAuth: true,
    icon: 'icon-home',
    order: 0,
  },
  children: [
    {
      path: 'homepage',
      name: 'homepage',
      component: () => import('@/views/home/homepage/index.vue'),
      meta: {
        locale: 'menu.home.homepage',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ]
};

export default HOME;
