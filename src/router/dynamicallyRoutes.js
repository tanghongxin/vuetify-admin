import dataSource from './mock'
import { lazyLoad } from './utils'

let dynamicallyRoutes = [];
(function recursive(items) {
  const children = []
  items.forEach(item => {
    let route = {
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
        dynamicallyRoutes.push(route)
        break
      case 'VIEW':
        route = {
          ...route,
          component: lazyLoad(item.resource),
        }
        children.push(route)
        break
      default:
        break
    }
  })
  return children
})(dataSource)

export default dynamicallyRoutes