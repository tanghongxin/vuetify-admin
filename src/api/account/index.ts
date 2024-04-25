import request from '@/utils/request';
import { LoginRes, LoginReq } from './types';

export function login(data: LoginReq) {
  return request.post<LoginReq, LoginRes>('/login', data);
}
