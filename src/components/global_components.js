import { DataTable } from './DataTable'
import { FormDrawer } from './FormDrawer'
import { Toast } from './Toast'
import { TMap, TMarker, TSearch } from './TMap'
import { VFollowMenu, VImgUpload, VLoading } from './VImplements'
import { CssStyle } from './CssStyle'

export default {
  install (app) {
    app.component(DataTable.name, DataTable)
    app.component(FormDrawer.name, FormDrawer)
    app.component(VFollowMenu.name, VFollowMenu)
    app.component(VImgUpload.name, VImgUpload)
    app.component(VLoading.name, VLoading)
    app.component(TMap.name, TMap)
    app.component(TSearch.name, TSearch)
    app.component(TMarker.name, TMarker)
    app.component(Toast.name, Toast)
    app.component(CssStyle.name, CssStyle)
  },
}
