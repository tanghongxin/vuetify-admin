import dataSource from '@/router/mock'

const result = [];
(function recursive (items) {
  const children = []
  items.forEach(item => {
    let _ = {
      text: item.text,
      icon: item.icon,
      model: false,
      to: item.to,
    }
    switch (item.type) {
      case 'MENU':
        _ = {
          ..._,
          children: recursive(item.children || []),
        }
        result.push(_)
        break
      case 'VIEW':
        children.push(_)
        break
      default:
        break
    }
  })
  return children
})(dataSource)

export default result
