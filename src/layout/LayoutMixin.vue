<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { AccountActions, SettingMutations } from '@/store/modules'

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
    ...mapState('account', [
      'username',
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
      toggleAppMultipleTabs: SettingMutations.TOGGLE_APP_MULTIPLE_TABS,
    }),
    ...mapActions('account', {
      logout: AccountActions.LOGOUT,
    }),
  },
}
</script>
