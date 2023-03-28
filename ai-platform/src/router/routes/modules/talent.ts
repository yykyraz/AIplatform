/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-28 15:17:33
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-03-28 15:33:59
 * @FilePath: \项目\AIplatform\ai-platform\src\router\routes\modules\talent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const TALENT: AppRouteRecordRaw = {
    path: '/talent',
    name: 'talent',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.talent',
        requiresAuth: true,
        icon: 'icon-user-group',
        order: 2,
    },
    children: [
        {
            path: 'group',
            name: 'group',
            component: () => import('@/views/talent/group/index.vue'),
            meta: {
                locale: 'menu.talent.group',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'detail/:id',
            name: 'detail',
            component: () => import('@/views/talent/detail/index.vue'),
            meta: {
                locale: 'menu.talent.detail',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true,
            },
        },
    ]
};

export default TALENT;
