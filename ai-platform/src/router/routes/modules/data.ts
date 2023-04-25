/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-01 12:05:12
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-25 19:26:24
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
            path: 'dataset',
            name: 'dataset',
            component: () => import('@/views/data/index.vue'),
            meta: {
                locale: 'menu.data.dataset',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'dataSetDetail/:id',
            name: 'dataSetDetail',
            component: () => import('@/views/data/dataSetDetail.vue'),
            meta: {
                locale: 'menu.data.dataSetDetail',
                requiresAuth: true,
                roles: ['*'],
                hideInMenu: true
            },
        },
    ]
};

export default DATA;