/**
 * 查询地址
 * @param {String} query 地址
 * @param {Object} options SearchService构造对象
 * @return {Promise<Object>}
 */
export const searchPlaces = function (query, options = {}) {
  return new Promise((resolve, reject) => {
    const service = new qq.maps.SearchService({
      ...options,
      complete: resolve,
      error: reject,
    })
    service.search(query)
  })
}
