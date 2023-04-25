/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-24 12:59:58
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-24 13:00:22
 * @FilePath: \AIplatform\ai-platform\src\api\scene.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

/*
 * 页面：场景库
*/

// 返回所有场景
export function showAllScene() {
    return axios.post<any>('http://127.0.0.1:7001/sceneAll');
}

// 查找场景
export function findScene(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/sceneFind', data);
}

// 场景详情
export function getSceneDetail(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/sceneDetail', data);
}

// 添加场景
export function createScene(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/sceneCreate', data);
}

// 删除场景
export function delScene(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/sceneDelete', data);
}

// 更新场景信息
export function updateScene(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/sceneUpdate', data);
}
