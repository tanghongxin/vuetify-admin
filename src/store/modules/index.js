import { default as account, AccountActions, AccountMutations } from './account'
import { default as setting, SettingMutations} from './setting'

const modules = {
  account,
  setting,
}

export {
  modules as default,
  AccountActions,
  AccountMutations,
  SettingMutations,
}
