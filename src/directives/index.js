import { hasPermission, hasAnyPermission, hasRole, hasAnyRole } from './permissions'

export default {
  install (app) {
    app.use(hasPermission)
    app.use(hasAnyPermission)
    app.use(hasRole)
    app.use(hasAnyRole)
  },
}
