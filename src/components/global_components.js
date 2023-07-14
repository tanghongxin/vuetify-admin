import { DataTable } from './DataTable'
import { FormDrawer } from './FormDrawer'
import { Toast } from './Toast'
import { TMap, TMarker, TSearch } from './TMap'
import { VFollowMenu, VImgUpload, VLoading } from './VImplements'
import { CssStyle } from './CssStyle'

const components = {
  DataTable,
  FormDrawer,
  VFollowMenu,
  VImgUpload,
  VLoading,
  TMap,
  TSearch,
  TMarker,
  Toast,
  CssStyle,
}

export {
  DataTable,
  FormDrawer,
  VFollowMenu,
  VImgUpload,
  VLoading,
  TMap,
  TSearch,
  TMarker,
  Toast,
  CssStyle,
}

export default {
  install (app) {
    Object.values(components).forEach(comp => {
      app.component(comp.name, comp)
    })
  },
}
