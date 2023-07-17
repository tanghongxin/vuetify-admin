import {
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
} from './global_components'

// https://github.com/johnsoncodehk/volar
declare module 'vue' {
  export interface GlobalComponents {
    DataTable: typeof DataTable
    FormDrawer: typeof DataTable,
    VFollowMenu: typeof VFollowMenu,
    VImgUpload: typeof VImgUpload,
    TMap: typeof TMap,
    TSearch: typeof TSearch,
    TMarker: typeof TMarker,
    Toast: typeof Toast,
    CssStyle: typeof CssStyle,
  }
}

export {}
