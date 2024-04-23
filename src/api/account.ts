import request from '@/utils/request';
import { LoginSuccessRes, LoginPayload } from '@/types';

export const login = function (data: LoginPayload) {
  return request.post<never, LoginSuccessRes>('/login', data);
};
