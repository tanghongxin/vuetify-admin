import request from '@/utils/request'

/**
 * 新增项目
 * @param {*} data 
 * @return {Promise<any>}
 */
export const addProject = function (data = {}) {
  return request.post('/project', data)
}

export const getProjectList = function (query = {}) {
  return request.get('/project/list', query)
}
