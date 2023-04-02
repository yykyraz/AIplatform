/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 12:05:12
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-01 14:18:56
 * @FilePath: \项目\AIplatform\ai-platform\src\router\routes\modules\algorithm.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const AIGORITHM: AppRouteRecordRaw = {
    path: '/algorithm',
    name: 'algorithm',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.algorithm',
        requiresAuth: true,
        icon: 'icon-computer',
        order: 2,
    },
    children: [
        {
            path: 'showAl',
            name: 'showAl',
            component: () => import('@/views/algorithm/index.vue'),
            meta: {
                locale: 'menu.algorithm.showAl',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'aldetail/:id',
            name: 'aldetail',
            component: () => import('@/views/algorithm/aldetail.vue'),
            meta: {
                locale: 'menu.algorithm.aldetail',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true,
            },
        },
    ]
};

export default AIGORITHM;