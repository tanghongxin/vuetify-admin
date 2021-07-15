// https://lbs.qq.com/webApi/javascriptV2/jsGuide/jsService
export default class TMapService {
  constructor () {
    if (!TMapService.prototype.instance) {
      TMapService.prototype.instance = this
    }
    return TMapService.prototype.instance
  }

  searchPlaces (query, options = {}) {
    return new Promise((resolve, reject) => {
      const service = new qq.maps.SearchService({
        complete: resolve,
        error: reject,
        ...options,
        pageIndex: 1,
        pageCapacity: 10,
        location: "北京",
      })
      service.search(query)
    })
  }
}
