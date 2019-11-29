export default {
  setPermissions (state, permissions = []) {
    state.permissions = permissions
  },
  setMenus (state, menus = []) {
    state.menus = menus
  },
  setToken (state, token = '') {
    state.token = token
  },
}
