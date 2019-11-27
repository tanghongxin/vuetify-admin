import request from '@/utils/request'

export const login = function (data) {
  return request.post('/login', data)
}
