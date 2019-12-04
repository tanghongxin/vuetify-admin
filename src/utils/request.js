import axios from 'axios'

const STONE_REQUEST = axios.create({
  baseURL: '/api',
  responseType: 'json',
  validateStatus: status => status === 200,
})

const request = {
  post(url, params) {
    return STONE_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  delete (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return STONE_REQUEST.delete(`${url}${_params}`)
  },
  put(url, params) {
    return STONE_REQUEST.put(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  get (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return STONE_REQUEST.get(`${url}${_params}`)
  },
  export(url, params = {}) {
    // message.loading('导出数据中');
    return STONE_REQUEST.post(url, params, {
      responseType: 'blob',
    })
      .then(r => {
        const content = r.data
        const blob = new Blob([content])
        const fileName = `${new Date().getTime()}_导出结果.xlsx`
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, fileName)
        }
      })
      .catch(() => {
        // console.error(r)
        // message.error('导出失败');
      })
  },
  download(url, params, filename) {
    // message.loading('文件传输中');
    return STONE_REQUEST.post(url, params, {
      transformRequest: [
        params => {
          let result = ''
          Object.keys(params).forEach(key => {
            if (
              !Object.is(params[key], undefined) &&
              !Object.is(params[key], null)
            ) {
              result +=
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(params[key]) +
                '&'
            }
          })
          return result
        },
      ],
      responseType: 'blob',
    })
      .then(r => {
        const content = r.data
        const blob = new Blob([content])
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, filename)
        }
      })
      .catch(() => {
        // console.error(r)
        // message.error('下载失败');
      })
  },
  upload(url, params) {
    return STONE_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default request
