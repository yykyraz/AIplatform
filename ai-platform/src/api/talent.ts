/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-23 09:33:41
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-24 10:30:28
 * @FilePath: \AIplatform\ai-platform\src\api\talent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

/*
 * 页面：人才库
*/

// 返回所有人才
export function showAllTalent() {
    return axios.post<any>('http://127.0.0.1:7001/talentAll');
}

// 查找人才
export function findTalent(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/talentFind', data);
}

// 人才详情
export function getTalentDetail(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/talentDetail', data);
}

// 添加人才
export function createTalent(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/talentCreate', data);
}

// 删除人才
export function delTalent(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/talentDelete', data);
}

// 更新人才信息
export function updateTalent(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/talentUpdate', data);
}
