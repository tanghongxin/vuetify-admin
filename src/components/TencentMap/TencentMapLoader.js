const DEFAULT_TencentMap_CONFIG = {
  key: 'KZQBZ-DV5CI-SJLGK-5HYYA-2DWBT-JTFFO',
  v: '2.exp',
  protocol: 'https',
  hostAndPath: 'map.qq.com/api/js',
  libraries: ['place'],
  callback: 'TencentMapInit',
}

export default class TencentMapLoader {
  constructor(config) {
    this._config = {
      ...DEFAULT_TencentMap_CONFIG,
      ...config,
    }
  }

  /**
   * 载入地图脚本
   * @returns {Promise<any>}
   */
  load() {
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        return resolve
      }
      const scriptElement = document.createElement('script')
      scriptElement.type = 'text/javascript'
      scriptElement.async = true
      scriptElement.defer = true
      scriptElement.id = 'TencentMap_plus_js'
      scriptElement.src = this.getScriptSrc()
      document.head.appendChild(scriptElement)
      // 地图加载完成后回调，移除已加载完成的脚本
      window.TencentMapInit = () => {
        this.removeScript(scriptElement)
        resolve()
      }

      // 脚本载入失败删除错误脚本
      scriptElement.addEventListener(
        'error',
        e => {
          this.removeScript(scriptElement)
          reject(e)
        },
        false
      )
    })
  }

  /**
   * 载入脚本地址
   * @returns {string}
   * @private
   */
  getScriptSrc() {
    // TencentMap libraries prefix reg
    const TencentMapPrefixReg = /^AMap./

    const config = this._config
    const paramKeys = ['v', 'key', 'libraries', 'callback']

    if (config.libraries && config.libraries.length > 0) {
      const librariess = []

      // 插件兼容
      // TODO: remove
      config.libraries.forEach(item => {
        const prefixName = TencentMapPrefixReg.test(item)
          ? item
          : 'AMap.' + item
        const pureName = prefixName.replace(TencentMapPrefixReg, '')

        librariess.push(prefixName, pureName)
      })

      config.libraries = librariess
    }

    const params = Object.keys(config)
      .filter(k => ~paramKeys.indexOf(k))
      .filter(k => config[k] != null)
      .filter(k => {
        return (
          !Array.isArray(config[k]) ||
          (Array.isArray(config[k]) && config[k].length > 0)
        )
      })
      .map(k => {
        let v = config[k]
        if (Array.isArray(v))
          return {
            key: k,
            value: v.join(','),
          }
        return {
          key: k,
          value: v,
        }
      })
      .map(entry => `${entry.key}=${entry.value}`)
      .join('&')
    return `${this._config.protocol}://${this._config.hostAndPath}?${params}`
  }

  /**
   * 移除脚本
   * @param scriptElement 脚本元素
   * @private
   */
  removeScript(scriptElement) {
    // TODO
    document.head.removeChild(scriptElement)
    // const autoAMapScript = document.getElementById('TencentMap_plus_js')
    // document.head.removeChild(autoAMapScript)
  }
}
