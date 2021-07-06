import Toast from './Toast'
import ToastService from './ToastService'

const toastService = new ToastService()

const toast = {
  success: ({ message }) => toastService.addItem(({ message, color: 'success' })),
  warning: ({ message }) => toastService.addItem(({ message, color: 'warning' })),
  error: ({ message }) => toastService.addItem(({ message, color: 'error' })),
  info: ({ message }) => toastService.addItem(({ message, color: 'info' })),
}

export  {
  Toast,
  toast,
}
