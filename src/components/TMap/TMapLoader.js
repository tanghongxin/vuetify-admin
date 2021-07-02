import qs from 'qs'

export default class TMapLoader {
  constructor ({ key, v, protocol, hostAndPath, libraries }) {
    if (!TMapLoader.prototype.instance) {
      this._config = {
        key, v, protocol, hostAndPath, libraries,
        callback: `TENCENT_MAP_INIT_CALLBACK${Date.now()}`,
      }
      TMapLoader.prototype.instance = this
    }
    return TMapLoader.prototype.instance
  }

  init () {
    return new Promise((resolve, reject) => {
      if (window.qq && window.qq.maps && window.qq.maps.Map) {
        return resolve()
      }

      const script = document.createElement('script')
      Object.assign(script, {
        type: 'text/javascript',
        async: true,
        defer: true,
        id: 'TencentMap_plus_js',
        src: this.getScriptSrc(),
      })
      document.head.appendChild(script)

      window[this._config.callback] = () => {
        this.dispose(script)
        resolve()
      }

      script.addEventListener('error', (err) => {
        this.dispose(script)
        reject(err)
      })
    })
  }

  getScriptSrc () {
    const { key, v, protocol, hostAndPath, libraries, callback } = this._config
    const params = {
      key, v, callback,
      libraries: libraries.join(','),
    }
    return `${protocol}://${hostAndPath}?${qs.stringify(params)}`
  }

  dispose (script) {
    document.head.removeChild(script)
    Reflect.deleteProperty(window, this._config.callback)
  }
}
