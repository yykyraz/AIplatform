/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-04 13:38:09
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-04 13:42:47
 * @FilePath: \项目\AIplatform\ai-platform\src\router\routes\modules\competition.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COMPETITION: AppRouteRecordRaw = {
  path: '/competition',
  name: 'competition',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.competition',
    requiresAuth: true,
    icon: 'icon-relation',
    order: 5,
  },
  children: [
    {
      path: 'aiCompetion',
      name: 'aiCompetion',
      component: () => import('@/views/competition/index.vue'),
      meta: {
        locale: 'menu.aispace.aiCompetion',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ]
};

export default COMPETITION;
