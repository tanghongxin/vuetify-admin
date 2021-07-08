import Toast from './Toast'
import event, { EVENT_TYPE_ADD_ITEM } from './event'

const toast = {
  success: ({ message = '', timeout = 4000 }) => event.emit(EVENT_TYPE_ADD_ITEM, { message, timeout, color: 'success' }),
  warning: ({ message = '', timeout = 4000 }) => event.emit(EVENT_TYPE_ADD_ITEM, { message, timeout, color: 'warning' }),
  error: ({ message = '', timeout = 4000 }) => event.emit((EVENT_TYPE_ADD_ITEM, { message, timeout, color: 'error' })),
  info: ({ message = '', timeout = 4000 }) => event.emit(EVENT_TYPE_ADD_ITEM, { message, timeout, color: 'info' }),
}

export  {
  Toast,
  toast,
}
