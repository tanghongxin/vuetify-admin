import { default as account, AccountActions, AccountMutations } from './account'
import { default as setting, SettingMutations} from './setting'
import { default as runtime, RuntimeMutations } from './runtime'

const modules = {
  account,
  setting,
  runtime,
}

export {
  modules as default,
  AccountActions,
  AccountMutations,
  SettingMutations,
  RuntimeMutations,
}
