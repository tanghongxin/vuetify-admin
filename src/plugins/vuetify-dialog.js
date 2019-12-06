import Vue from 'vue'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import vuetify from './vuetify'

const defaultOptions = {
  icon: false,
  actions: {
    false: {
      text: '取消',
      // handle: () => Promise.resolve(),
    },
    true: {
      text: '确定',
      // handle: () => Promise.resolve(),
    },
  },
}

Vue.use(VuetifyDialog, {
  context: { vuetify } ,
  confirm: {
    ...defaultOptions,
  },
  warning: {
    ...defaultOptions,
  },
  error: {
    ...defaultOptions,
  },
  prompt: {
    ...defaultOptions,
  },
})
