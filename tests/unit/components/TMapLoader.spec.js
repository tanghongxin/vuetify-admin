import TMapLoader from '@/components/TMap/TMapLoader'
import { sleep } from '../../utils'
import jsdom from 'jsdom'

describe('TMapLoader', () => {
  const config = {
    key: process.env.VUE_APP_TENCENT_MAP_KEY,
    v: process.env.VUE_APP_TENCENT_MAP_VERSION,
    protocol: process.env.VUE_APP_TENCENT_MAP_PROTOCOL,
    hostAndPath: process.env.VUE_APP_TENCENT_MAP_HOST_AND_PATH,
    libraries: ['place'],
  }

  it('Singleton exists', () => {
    expect(new TMapLoader(config)).toEqual(new TMapLoader(config))
  })

  it('Mount qq constructor to window', async () => {
    const DOM = new jsdom.JSDOM(`<!doctype html>
    <html lang="en">
      <head>
         <title>Document</title>
      </head>
      <body></body>
    </html>`, {
      url: "https://localhost/",
      runScripts: "dangerously",
      resources: "usable",
      includeNodeLocations: true,
    })

    // wait for window load
    await sleep(100)

    jest.spyOn(global, "document", "get").mockImplementation(() => DOM.window.document)
    jest.spyOn(global, "window", "get").mockImplementation(() => DOM.window)

    DOM.window.loader = new TMapLoader(config)
    const getScriptSrcSpy = jest.spyOn(DOM.window.loader, 'getScriptSrc')

    // Fetch
    await DOM.window.loader.init()
    expect(getScriptSrcSpy).toHaveBeenCalledTimes(1)
    expect(DOM.window.qq.maps.Map).toBeTruthy()

    // Dispose
    expect(DOM.window.document.getElementById('TencentMap_plus_js')).toBe(null)

    // ReFetch
    await DOM.window.loader.init()
    expect(getScriptSrcSpy).toHaveBeenCalledTimes(1)
    expect(DOM.window.qq.maps.Map).toBeTruthy()
  }, 10000)
})
