<script>
import { mapMutations, mapState } from 'vuex'
import { SettingMutations } from '@/store/modules'

export default {
  computed: {
    ...mapState('setting', [
      'appHeaderHeight',
      'appNavigation',
      'appSetting',
      'appPermanentNavigation',
      'appPrimaryColor',
      'appThemeDark',
    ]),
  },
  methods: {
    ...mapMutations('setting', {
      setAppHeaderHeight: SettingMutations.SET_APP_HEADER_HEIGHT,
      setAppPrimaryColor: SettingMutations.SET_APP_PRIMARY_COLOR,
      toggleAppThemeDark: SettingMutations.TOGGLE_APP_THEME_DARK,
      toggleAppNavigation: SettingMutations.TOGGLE_APP_NAVIGATION,
      toggleAppSetting: SettingMutations.TOGGLE_APP_SETTING,
      togglePermanentAppNavigation: SettingMutations.TOGGLE_APP_PERMANENT_NAVIGATION,
    }),
  },
}
</script>
