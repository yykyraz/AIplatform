/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-03-28 14:49:22
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-03-28 15:02:00
 * @FilePath: \项目\AIplatform\ai-platform\src\router\routes\modules\exception.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EXCEPTION: AppRouteRecordRaw = {
    path: '/exception',
    name: 'exception',
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.exception',
        requiresAuth: true,
        icon: 'icon-exclamation-circle',
        order: 6,
        hideInMenu: true,
    },
    children: [
        {
            path: '403',
            name: '403',
            component: () => import('@/views/exception/403/index.vue'),
            meta: {
                locale: 'menu.exception.403',
                requiresAuth: true,
                roles: ['admin'],
                hideInMenu: true,
            },
        },
        {
            path: '404',
            name: '404',
            component: () => import('@/views/exception/404/index.vue'),
            meta: {
                locale: 'menu.exception.404',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true,
            },
        },
        {
            path: '500',
            name: '500',
            component: () => import('@/views/exception/500/index.vue'),
            meta: {
                locale: 'menu.exception.500',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true,
            },
        },
    ],
};

export default EXCEPTION;