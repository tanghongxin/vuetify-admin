export const removeKeepAliveCache = vm => {
  const key = vm.$vnode.key
  const { cache, keys } = vm.$vnode.parent.componentInstance
  if (keys.length && cache[key]) {
    const index = keys.indexOf(key)
    keys.splice(index, 1)
    delete cache[key]
  }
  vm.$destroy()
}
