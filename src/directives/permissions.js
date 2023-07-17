import store from '@/store'

export const hiddenClsName = 'permission_forbidden';

(function () {
  const style = document.createElement('style')
  style.innerText = `.${hiddenClsName} { display: none !important; }`

  const [head] = document.getElementsByTagName('head')
  head.append(style)
})()

// TODO: 代码复用

const hasPermissionFn = function (el, binding) {
  const permissions = store.state.account.permissions
  const value = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
  let flag = true
  for (let v of value) {
    if (!permissions.includes(v)) {
      flag = false
      break
    }
  }
  if (!flag) {
    el.classList.add(hiddenClsName)
  } else {
    el.classList.remove(hiddenClsName)
  }
}

// 必须包含列出的所有权限，元素才显示
const hasPermission = {
  install (app) {
    app.directive('hasPermission', hasPermissionFn)
  },
}

const hasAnyPermissionFn = function (el, binding) {
  const permissions = store.state.account.permissions
  const value = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
  let flag = false
  for (let v of value) {
    if (permissions.includes(v)) {
      flag = true
      break
    }
  }
  if (!flag) {
    el.classList.add(hiddenClsName)
  } else {
    el.classList.remove(hiddenClsName)
  }
}

// 只要包含列出的任意一个权限，元素就会显示
const hasAnyPermission = {
  install (app) {
    app.directive('hasAnyPermission', hasAnyPermissionFn)
  },
}

const hasRoleFn = function (el, binding) {
  const permissions = store.state.account.roles
  const value = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
  let flag = true
  for (let v of value) {
    if (!permissions.includes(v)) {
      flag = false
      break
    }
  }
  if (!flag) {
    el.classList.add(hiddenClsName)
  } else {
    el.classList.remove(hiddenClsName)
  }
}
// 必须包含列出的所有角色，元素才显示
const hasRole = {
  install (app) {
    app.directive('hasRole', hasRoleFn)
  },
}

const hasAnyRoleFn = function (el, binding) {
  const permissions = store.state.account.roles
  const value = Array.isArray(binding.value) ? binding.value : binding.value.split(',')
  let flag = false
  for (let v of value) {
    if (permissions.includes(v)) {
      flag = true
      break
    }
  }
  if (!flag) {
    el.classList.add(hiddenClsName)
  } else {
    el.classList.remove(hiddenClsName)
  }
}
// 只要包含列出的任意一个角色，元素就会显示
const hasAnyRole = {
  install (app) {
    app.directive('hasAnyRole', hasAnyRoleFn)
  },
};

export {
  hasPermission, hasAnyPermission, hasRole, hasAnyRole,
}
