import { useAccountStore } from '@/stores'

class PermissionsHelper {
  constructor () {
    if (!PermissionsHelper.prototype.instance) {
      this.accountStore = useAccountStore()
      
      PermissionsHelper.prototype.instance = this

    }
    return PermissionsHelper.prototype.instance
  }

  get allPermissions () {
    return this.accountStore.account?.permissions || []
  }

  get allRoles () {
    return this.accountStore.account?.roles || []
  }

  checkAllPermissions (permissions) {
    return permissions.every(p => this.allPermissions.includes(p))
  }

  checkPartialPermissions (permissions) {
    return permissions.some(p => this.allPermissions.includes(p))
  }

  checkAllRoles (roles) {
    return roles.every(r => this.allRoles.includes(r))
  }

  checkPartialRoles (roles) {
    return roles.some(r => this.allRoles.includes(r))
  }
}

export default {
  install (app) {
    // TODO: 确保 install 前 pinia 已被正确 install
    const permissionHelper = new PermissionsHelper()

    const directives = {
      hasAllPermissions (el, binding) {
        const permissions = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
        if (!permissionHelper.checkAllPermissions(permissions))
          el.remove()
      },
      hasAnyPermissions (el, binding) {
        const permissions = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
        if (!permissionHelper.checkPartialPermissions(permissions))
          el.remove()
      },
      hasAllRoles (el, binding) {
        const roles = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
        if (!permissionHelper.checkAllRoles(roles))
          el.remove()
      },
      hasAnyRoles (el, binding) {
        const roles = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
        if (!permissionHelper.checkPartialRoles(roles))
          el.remove()
      },
    }
    app.directive('hasAllPermissions', directives.hasAllPermissions)
    app.directive('hasAnyPermissions', directives.hasAnyPermissions)
    app.directive('hasAllRoles', directives.hasAllRoles)
    app.directive('hasAnyRoles', directives.hasAnyRoles)
  },
}
