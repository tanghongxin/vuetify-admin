import { ls } from '@/utils/storage'

export default {
  appHeaderHeight: window.document.body.clientWidth <= 600 ? 48 : 64,
  appNavigation: window.document.body.clientWidth > 1264,
  permanentAppNavition: ls.get('permanentAppNavition'),
  appSetting: false,
}
