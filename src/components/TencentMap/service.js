export default class Service {
  constructor() {
    if (!Service.prototype.instance) {
      Service.prototype.instance = this
    }
    return Service.prototype.instance
  }

  searchPlaces(query, options = {}) {
    return new Promise((resolve, reject) => {
      const service = new qq.maps.SearchService({
        ...options,
        complete: resolve,
        error: reject,
      })
      service.search(query)
    })
  }
}
