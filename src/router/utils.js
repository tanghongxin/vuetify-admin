const handleLazyLoadError = function (error) {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    // TODO: toast show
  } else {
    throw error
  }
}

export const lazyLoad = function (path) {
  return function(resolve) {
    import(`@/views/${path}.vue`)
      .then(mod => {
        resolve(mod)
      })
      .catch(handleLazyLoadError)
  }
}
