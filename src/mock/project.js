import Mock from 'mockjs-async'
import qs from 'qs'
import _ from 'lodash-es'

const item = {
  'id|+1': 1,
  name: '@csentence(5,12)',
  "time|30-120": 1,
  'category': '公共项目',
  "percent|30-80": 1,
  "price|100-500": 1,
  "occupy|1-2": true,
  type: '足道',
  lastModifyTime: `@datetime('yyyy.MM.dd HH:mm:ss')`,
  tags: '除湿',
}

Mock.mock(/\/api\/project/, 'post', () => new Promise(resolve => {
  setTimeout(resolve, 300)
}))

Mock.mock(/\/api\/project/, 'put', () => new Promise(resolve => {
  setTimeout(resolve, 300)
}))

Mock.mock(/\/api\/project\/\d+/, 'get', () => new Promise(resolve => {
  setTimeout(resolve, 300, Mock.mock(item))
}))

Mock.mock(/\/api\/project\/\d+/, 'delete', () => new Promise(resolve => {
  setTimeout(resolve, 300)
}))

Mock.mock(/\/api\/project\/list/, 'get', (req) => new Promise(resolve => {
  const { sortBy = [], sortDesc = [], itemsPerPage = 15 } = qs.parse(req.url)
  const { items } = Mock.mock({
    [`items|${itemsPerPage - 3}-${itemsPerPage}`]: [item],
  })
  setTimeout(resolve, 300, {
    total: items.length * 2 + 4,
    pageCount: 1,
    items: _.orderBy(items, sortBy, sortDesc.map(e => e === 'true' ? 'desc' : 'asc')),
  })
}))
