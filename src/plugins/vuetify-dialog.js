import Vue from 'vue'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import vuetify from './vuetify'
import _ from 'lodash'

const defaultOptions = {
  icon: false,
  actions: {
    false: { text: '取消' },
    true: { text: '确定' },
  },
}

Vue.use(VuetifyDialog, {
  context: { vuetify } ,
  confirm: _.cloneDeep(defaultOptions),
  warning: _.cloneDeep(defaultOptions),
  error: _.cloneDeep(defaultOptions),
  prompt: _.cloneDeep(defaultOptions),
})
