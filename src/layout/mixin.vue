<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { SettingMutations } from '@/store/modules'
import { SettingActions } from '@/store/modules/setting'

export default {
  computed: {
    ...mapState('setting', [
      'appHeaderHeight',
      'appNavigation',
      'appSetting',
      'appPermanentNavigation',
      'appPrimaryColor',
      'appThemeDark',
      'appMultipleTabs',
    ]),
  },
  methods: {
    ...mapMutations('setting', {
      setAppHeaderHeight: SettingMutations.SET_APP_HEADER_HEIGHT,
      setAppPrimaryColor: SettingMutations.SET_APP_PRIMARY_COLOR,
      toggleAppThemeDark: SettingMutations.TOGGLE_APP_THEME_DARK,
      toggleAppSetting: SettingMutations.TOGGLE_APP_SETTING,
      toggleAppNavigation: SettingMutations.TOGGLE_APP_NAVIGATION,
      toggleAppPermanentNavigation: SettingMutations.TOGGLE_APP_PERMANENT_NAVIGATION,
    }),
    ...mapActions('setting', {
      toggleAppMultipleTabs: SettingActions.TOGGLE_APP_MULTIPLE_TABS,
    }),
  },
  // TODO: UI entry
  created () {
    window.toggleAppMultipleTabs = this.toggleAppMultipleTabs
  },
}
</script>
