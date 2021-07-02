import { inject } from '@vue/composition-api'

const injectMapKey = Symbol()

const useMap = () => {
  const map = inject(injectMapKey)
  return map.value
}

export {
  useMap,
  injectMapKey,
}
