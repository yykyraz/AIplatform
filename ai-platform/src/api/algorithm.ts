/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-25 13:42:54
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-25 19:47:17
 * @FilePath: \AIplatform\ai-platform\src\api\algorithm.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

/*
 * 页面：算法库
*/

// 返回所有算法
export function showAllAlgorithm() {
    return axios.post<any>('http://127.0.0.1:7001/algorithmAll');
}

// 查找算法
export function findAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmFind', data);
}

// 算法详情
export function getAlgorithmDetail(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmDetail', data);
}

// 添加算法
export function createAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmCreate', data);
}

// 删除算法
export function delAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmDelete', data);
}

// 更新算法信息
export function updateAlgorithm(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/algorithmUpdate', data);
}
