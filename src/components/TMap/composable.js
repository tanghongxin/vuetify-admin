import { inject, provide, ref } from '@vue/composition-api'
import TMapService from './TMapService'
import TMapLoader from './TMapLoader'

const injectMapKey = Symbol()

const useProvide = (val) => {
  provide(injectMapKey, val)
}

const useInject = () => {
  const map = inject(injectMapKey)
  return map.value
}

const useState = (initialState) => {
  const state = ref(initialState)
  const setState = (newState) => {
    state.value = newState
  }
  return [state, setState]
}

const useLoader = () => {
  return new TMapLoader({
    key: process.env.VUE_APP_TENCENT_MAP_KEY,
    v: process.env.VUE_APP_TENCENT_MAP_VERSION,
    protocol: process.env.VUE_APP_TENCENT_MAP_PROTOCOL,
    hostAndPath: process.env.VUE_APP_TENCENT_MAP_HOST_AND_PATH,
    libraries: ['place'],
  })
}

const useService = () => {
  return new TMapService()
}

export {
  useInject,
  useProvide,
  useState,
  useLoader,
  useService,
}
