import Toast from './Toast'
import event, { EVENT_TYPE_ADD_ITEM } from './event'

const add = (color) => ({ message = '', timeout = 4000 }) => event.emit(EVENT_TYPE_ADD_ITEM, { message, timeout, color })

const toast = {
  success: add('success'),
  warning: add('warning'),
  error: add('error'),
  info: add('info'),
}

export {
  Toast,
  toast,
}
