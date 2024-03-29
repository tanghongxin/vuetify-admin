import { inject, provide, ref } from 'vue'
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
    key: import.meta.env.VITE_TENCENT_MAP_KEY,
    v: import.meta.env.VITE_TENCENT_MAP_VERSION,
    protocol: import.meta.env.VITE_TENCENT_MAP_PROTOCOL,
    hostAndPath: import.meta.env.VITE_TENCENT_MAP_HOST_AND_PATH,
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
