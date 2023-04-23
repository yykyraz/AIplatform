/*
 * @Author: yykyraz kk@qq.com
 * @Date: 2023-04-23 09:33:41
 * @LastEditors: yykyraz kk@qq.com
 * @LastEditTime: 2023-04-23 10:56:27
 * @FilePath: \AIplatform\ai-platform\src\api\talent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

/*
 * 页面：人才库
*/

// 查找人才
export function find(data: any) {
    // return axios.post<any>('http://127.0.0.1:7001/find', data);
    return axios.post<any>('http://127.0.0.1:7001/find', data);
}

// 添加人才
export function create(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/create', data);
}

// 删除人才
export function del(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/delete', data);
}

// 更新人才信息
export function update(data: any) {
    return axios.post<any>('http://127.0.0.1:7001/update', data);
}
