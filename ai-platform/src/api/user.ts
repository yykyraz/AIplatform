import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}


// 查找用户
export function find(data: any) {
  // return axios.post<any>('http://127.0.0.1:7001/find', data);
  return axios.post<any>('http://127.0.0.1:7001/userFind', data);
}

// 添加用户
export function create(data: any) {
  return axios.post<any>('http://127.0.0.1:7001/userCreate', data);
}

// 删除用户
export function del(data: any) {
  return axios.post<any>('http://127.0.0.1:7001/userDelete', data);
}

// 更新用户信息
export function update(data: any) {
  return axios.post<any>('http://127.0.0.1:7001/userUpdate', data);
}