import { onMounted } from '@vue/composition-api'
import TMapLoader from './TMapLoader'

const useInit = (cb) => {
  onMounted(async () => {
    await TMapLoader.getInstance().init()
    cb()
  })
}

export {
  useInit,
}
