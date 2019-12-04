import request from '@/utils/request'

/**
 * 新增项目
 * @param {*} data 
 * @return {Promise<any>}
 */
export const addShop = function (data = {}) {
  return request.post('/shop', data)
}

export const getShopList = function (query = {}) {
  return request.get('/shop/list', query)
}
