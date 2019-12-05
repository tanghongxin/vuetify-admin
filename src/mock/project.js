import Mock from 'mockjs-async'
import Timeout from 'await-timeout'

// 新增项目
Mock.mock(/\/api\/project/, 'post', () => new Promise(async resolve => {
  await Timeout.set(300)
  resolve()
}))

// 项目详情
Mock.mock(/\/api\/project\/\d+/, 'get', () => new Promise(async resolve => {
  await Timeout.set(300)
  resolve({
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

// 项目列表
Mock.mock(/\/api\/project\/list/, 'get', () => new Promise(async resolve => {
  await Timeout.set(300)
  resolve({
    total: 30,
    pageCount: 3,
    items: [
      {
        id: 1,
        number: '1',
        name: '若石足道',
        time: '70',
        category: '公共项目',
        price: '199',
        type: '足道',
        occupy: '否',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 2,
        number: '2',
        name: '若石精品足道',
        time: '90',
        category: '公共项目',
        price: '269',
        type: '足道',
        occupy: '否',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 3,
        number: '3',
        name: '若石养生套餐',
        time: '120',
        category: '公共项目',
        price: '299',
        type: '套餐',
        occupy: '否',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 4,
        number: '4',
        name: '若石贵族SPA',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 5,
        number: '5',
        name: '若石贵族SPA2',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 6,
        number: '6',
        name: '若石贵族SPA3',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 7,
        number: '7',
        name: '若石贵族SPA4',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 8,
        number: '8',
        name: '若石贵族SPA5',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 9,
        number: '9',
        name: '若石贵族SPA6',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
      {
        id: 10,
        number: '10',
        name: '若石贵族SPA7',
        time: '80',
        category: '公共项目',
        price: '499',
        type: 'SPA',
        occupy: '是',
        percent: '30',
        lastModifyTime: '2019-08-27 16:30',
      },
    ],
  })
}))
