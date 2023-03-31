import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const AISPACE: AppRouteRecordRaw = {
  path: '/aispace',
  name: 'aispace',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.aispace',
    requiresAuth: true,
    icon: 'icon-robot',
    order: 1,
  },
  children: [
    {
      path: 'algorithm',
      name: 'algorithm',
      component: () => import('@/views/aispace/algorithm/index.vue'),
      meta: {
        locale: 'menu.aispace.algorithm',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'scene',
      name: 'scene',
      component: () => import('@/views/aispace/scene/index.vue'),
      meta: {
        locale: 'menu.aispace.scene',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'sceneDetail/:id',
      name: 'sceneDetail',
      component: () => import('@/views/aispace/scene/sceneDetail.vue'),
      meta: {
          locale: 'menu.scene.detail',
          requiresAuth: true,
          roles: ['*'],
          hideInMenu: true,
      },
  },
  ]
};

export default AISPACE;
