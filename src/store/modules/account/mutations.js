import _ from 'lodash'
import { lazyLoad } from '@/router/utils'
import { buildDynamicallyRoutes } from '@/router/routes'

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
  buildRoutes (state) {
    buildDynamicallyRoutes((function recursive (items) {
      return items.map(item => {
        let route = {
          meta: {
            permissions: item.permissions || [],
          },
          name: item.text,
          path: item.to,
        }
        switch (item.type) {
          case 'MENU':
            route = {
              ...route,
              component: { render: h => h('router-view') },
              children: recursive(item.children || []),
              redirect: '/exception/404',
            }
            break
          case 'VIEW':
            route = {
              ...route,
              beforeEnter: (to, from, next) => {
                if (_.difference(to.meta.permissions, state.permissions).length !== 0) {
                  next('/exception/403')
                } else {
                  next()
                }
              },
              component: lazyLoad(item.resource),
            }
            break
          default:
            break
        }
        return route
      })
    })(state.menus))
  },
}
