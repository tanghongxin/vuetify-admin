import Mock from 'mockjs-async'
import qs from 'qs'
import _ from 'lodash-es'

// 新增项目
Mock.mock(/\/api\/project/, 'post', () => new Promise(async resolve => {
  setTimeout(resolve, 300)
}))

// 编辑项目
Mock.mock(/\/api\/project/, 'put', () => new Promise(async resolve => {
  setTimeout(resolve, 300)
}))

// 项目详情
Mock.mock(/\/api\/project\/\d+/, 'get', () => new Promise(async resolve => {
  setTimeout(resolve, 300, {
    id: 1,
    number: 1,
    name: '若石足道',
    time: '70',
    category: '公共项目',
    price: '199',
    type: '足道',
    occupy: '否',
    percent: '30',
    lastModifyTime: '2019-08-27 16:30',
    tags: '除湿',
  })
}))

// 删除项目
Mock.mock(/\/api\/project\/\d+/, 'delete', () => new Promise(async resolve => {
  setTimeout(resolve, 300)
  resolve()
}))

// 项目列表
Mock.mock(/\/api\/project\/list/, 'get', (req) => new Promise(async resolve => {
  const { sortBy = [], sortDesc = [] } = qs.parse(req.url)
  const desc = sortDesc[0] === 'true'
  const { items } = Mock.mock({
    'items|15-30': [
      {
        'id|+1': 1,
        name: '若石贵族SPA3',
        "time|30-120": 1,
        'category': '公共项目',
        "percent|30-80": 1,
        "price|100-500": 1,
        "occupy|1-2": true,
        type: '足道',
        lastModifyTime: '2019-08-27 16:30',
      },
    ],
  })
  setTimeout(resolve, 300, {
    total: 30,
    pageCount: 2,
    items: _.orderBy(items, sortBy, [desc ? 'desc' : 'asc']),
  })
}))
