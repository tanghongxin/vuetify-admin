import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const vuetifyColor = 'primary'
NProgress.configure({
  parent: '#app',
  template: `<div class="bar ${vuetifyColor}" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
  showSpinner: false,
})

export { NProgress }
