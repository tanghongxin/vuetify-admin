import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    appHeaderHeight: document.body.clientWidth <= 600 ? 48 : 56,
    appNavigation: document.body.clientWidth > 1264,
    appPermanentNavigation: true,
    appTheme: 'red',
    appThemeDark: false,
    appSetting: false,
    appMultipleTabs: true,
  }),
  actions: {
    setAppHeaderHeight (appHeaderHeight) {
      this.appHeaderHeight = appHeaderHeight
    },
    setAppTheme (appTheme) {
      this.appTheme = appTheme
    },
    toggleAppThemeDark () {
      this.appThemeDark = !this.appThemeDark
    },
    toggleAppNavigation () {
      this.appNavigation = !this.appNavigation
    },
    toggleAppPermanentNavigation () {
      this.appPermanentNavigation = !this.appPermanentNavigation
    },
    toggleAppSetting () {
      this.appSetting = !this.appSetting
    },
    toggleAppMultipleTabs () {
      this.appMultipleTabs = !this.appMultipleTabs
    },
  },
})
