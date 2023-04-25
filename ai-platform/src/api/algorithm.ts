/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-25 13:42:54
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-25 15:51:32
 * @FilePath: \AIplatform\ai-platform\src\api\algorithm.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

/*
 * 页面：场景库
*/

// 返回所有场景
export function showAllAlgorithm() {
    return axios.post<any>('http://127.0.0.1:7001/algorithmAll');
}

// 查找场景
export function findAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmFind', data);
}

// 场景详情
export function getAlgorithmDetail(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmDetail', data);
}

// 添加场景
export function createAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmCreate', data);
}

// 删除场景
export function delAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmDelete', data);
}

// 更新场景信息
export function updateAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmUpdate', data);
}
