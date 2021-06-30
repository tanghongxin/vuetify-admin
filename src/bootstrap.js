import store from '@/store'
import { AccountActions } from '@/store/modules/account'
import './mock'

store.dispatch(`account/${AccountActions.BUILD_ROUTES}`)
