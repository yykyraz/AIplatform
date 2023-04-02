/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-26 16:42:31
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-01 12:25:28
 * @FilePath: \项目\AIplatform\ai-platform\src\router\routes\modules\aispace.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    {
      path: 'ocrword',
      name: 'ocrword',
      component: () => import('@/views/aispace/ocrWord/index.vue'),
      meta: {
        locale: 'menu.aispace.ocrword',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'ocrexcel',
      name: 'ocrexcel',
      component: () => import('@/views/aispace/ocrExcel/index.vue'),
      meta: {
        locale: 'menu.aispace.ocrexcel',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ]
};

export default AISPACE;
