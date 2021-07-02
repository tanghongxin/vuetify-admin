import { inject, provide, ref } from '@vue/composition-api'

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

export {
  useInject,
  useProvide,
  useState,
}
