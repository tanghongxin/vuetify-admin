import './vue-snotify.scss'
import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'

const options = {
  global: {
    showProgressBar: false,
    pauseOnHover: true,
    newOnTop: true,
    oneAtTime: false,
    preventDuplicates: false,
    titleMaxLength: 110,
    bodyMaxLength: 1110,
    timeout: 5000,
  },
  toast: {
    position: SnotifyPosition.rightTop,
  },
}

Vue.use(Snotify, options)

export const snotify = Vue.prototype.$snotify
