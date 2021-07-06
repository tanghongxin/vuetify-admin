import Vue from 'vue'
import { DataTable } from './DataTable'
import { FormDrawer } from './FormDrawer'
import { Toast } from './Toast'
import { TMap, TMarker, TSearch } from './TMap'
import { VDateTimeInput, VDateTimePicker, VFollowMenu, VImgUpload, VLoading } from './VImplements'

Vue.component(DataTable.name, DataTable)
Vue.component(FormDrawer.name, FormDrawer)
Vue.component(VDateTimeInput.name, VDateTimeInput)
Vue.component(VDateTimePicker.name, VDateTimePicker)
Vue.component(VFollowMenu.name, VFollowMenu)
Vue.component(VImgUpload.name, VImgUpload)
Vue.component(VLoading.name, VLoading)
Vue.component(TMap.name, TMap)
Vue.component(TSearch.name, TSearch)
Vue.component(TMarker.name, TMarker)
Vue.component(Toast.name, Toast)
