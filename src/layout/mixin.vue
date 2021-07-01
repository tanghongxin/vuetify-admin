<script>
import { mapMutations, mapState } from 'vuex'
import { SettingMutations } from '@/store/modules'

export default {
  computed: {
    ...mapState('setting', ['appHeaderHeight', 'appNavigation', 'appSetting', 'permanentAppNavigation']),
  },
  methods: {
    ...mapMutations('setting', {
      setAppHeaderHeight: SettingMutations.SET_APP_HEADER_HEIGHT,
      toggleAppNavigation: SettingMutations.TOGGLE_APP_NAVIGATION,
      toggleAppSetting: SettingMutations.TOGGLE_APP_SETTING,
      togglePermanentAppNavigation: SettingMutations.TOGGLE_PERMANENT_APP_NAVIGATION,
    }),
  },
}
</script>
