/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 12:05:12
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-01 12:49:31
 * @FilePath: \项目\AIplatform\ai-platform\src\router\routes\modules\algorithm.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DATA: AppRouteRecordRaw = {
    path: '/data',
    name: 'data',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.data',
        requiresAuth: true,
        icon: 'icon-branch',
        order: 3,
    },
    children: [
        {
            path: 'pro',
            name: 'pro',
            component: () => import('@/views/data/pro/index.vue'),
            meta: {
                locale: 'menu.data.pro',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'classic',
            name: 'classic',
            component: () => import('@/views/data/classic/index.vue'),
            meta: {
                locale: 'menu.data.classic',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ]
};

export default DATA;