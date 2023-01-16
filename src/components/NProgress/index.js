import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './index.scss'

NProgress.configure({
  parent: '#v-application',
  template: `<div class="bar custom-nprogress" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
  showSpinner: false,
})

export { NProgress }
