import Vue from 'vue'
import Vuetify from 'vuetify'
import { Toast } from '@/components/Toast'
import { mount, createWrapper } from '@vue/test-utils'

Vue.use(Vuetify)

Object.assign(global, {
  bodyWrapper: createWrapper(document.body),
  toastWrapper: mount(Toast, {
    vuetify: new Vuetify(),
    attachTo: document.body,
  }),
})
