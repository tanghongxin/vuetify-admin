import request from '@/utils/request'

/**
 * 新增项目
 * @param {Object} data 
 * @return {Promise<any>}
 */
export const addProject = function (data = {}) {
  return request.post('/project', data)
}

/**
 * 删除一个项目
 * @param {*} id 
 * @return {Promise<any>}
 */
export const deleteProject = function (id) {
  return request.delete(`/project/${id}`)
}

/**
 * 根据id查询项目详情
 * @param {Number | String} id 
 * @return {Promise<any>}
 */
export const getProject = function (id) {
  return request.get(`/project/${id}`)
}

/**
 * 查询项目列表
 * @param {*} query 
 * @return {Promise<any>}
 */
export const getProjectList = function (query = {}) {
  return request.get('/project/list', query)
}
