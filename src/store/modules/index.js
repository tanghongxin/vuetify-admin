import { default as account, AccountActions, AccountMutations } from './account'
import { default as setting, SettingMutations} from './setting'
import { default as runTime, RunTimeMutations } from './rumTime'

const modules = {
  account,
  setting,
  runTime,
}

export {
  modules as default,
  AccountActions,
  AccountMutations,
  SettingMutations,
  RunTimeMutations,
}
