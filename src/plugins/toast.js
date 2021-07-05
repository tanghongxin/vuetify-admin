import Vue from 'vue'
import { Toast, toast } from '@/components/Toast'

Vue.component(Toast.name, Toast)
Vue.prototype.$toast = toast
