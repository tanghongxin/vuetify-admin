import Adaptor from 'axios-mock-adapter'
import request from '@/utils/request'
import _ from 'lodash-es'
import dayjs from 'dayjs'

const adaptor = new Adaptor(request, { delayResponse: 300 })

const item = (id = 1) => ({
  id,
  // TODO: random name
  name: '123',
  time: (Math.random() * 30 + 40).toFixed(0),
  category: Math.random() > 0.5 ? '公共项目' : '其他项目',
  percent: (Math.random() * 30 + 40).toFixed(0),
  price: (Math.random() * 400 + 100).toFixed(0),
  occupy: Math.random() > 0.5,
  type: ['足道', '全身按摩', '中医调理', 'SPA', '套餐'][`${Math.abs(Math.random() - 0.5)}`[2]],
  tags: ['除湿', '活血', '助眠', '通气', '养颜'][`${Math.abs(Math.random() - 0.5)}`[2]],
  lastModifyTime: dayjs(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('YYYY-MM-DD HH:mm:ss'),
})

adaptor.onPost(/api\/login/).reply(config => {
  const { username } = JSON.parse(config.data)
  return [200, {
    username,
    token: 'ac21ebab-bddc-41a3-bef5-4ecf3325c888',
    permissions: [],
    menus: [
      {
        text: '首页',
        icon: 'home',
        hidden: false,
        to: '/home',
        permissions: [],
        type: 'VIEW',
        resource: 'home/index',
      },
      {
        text: '项目管理',
        icon: 'apps',
        hidden: false,
        to: '/project',
        permissions: [],
        type: 'MENU',
        resource: '',
        children: [
          {
            text: '项目列表',
            hidden: false,
            to: '/project/list',
            permissions: [],
            type: 'VIEW',
            resource: 'project/index',
          },
        ],
      },
      {
        text: '腾讯地图',
        icon: 'place',
        hidden: false,
        to: '/map',
        permissions: [],
        type: 'VIEW',
        resource: 'map/index',
      },
      {
        text: '404',
        icon: 'priority_high',
        hidden: false,
        to: '404_test',
        redirect: '/exception/404',
        permissions: [],
        type: 'VIEW',
        resource: '',
      },
    ],
  }]
})

adaptor.onPost(/\/api\/project/).reply(200)
adaptor.onPut(/\/api\/project/).reply(200)
adaptor.onDelete(/\/api\/project\/\d+/).reply(200)
adaptor.onGet(/\/api\/project\/\d+/).reply(200, item())
adaptor.onGet(/\/api\/project\/list/).reply(config => {
  const { sortBy = [], sortDesc = [], itemsPerPage = 15 } = config.params

  // FIXME: sortBy does not work
  const items = _.sortBy(
    Array(itemsPerPage).fill(null).map((__, i) => item(i)),
    sortBy,
    sortDesc.map(e => e === 'true' ? 'desc' : 'asc'),
  )
  
  return [200, { total: itemsPerPage * 3 + 3, items }]
})
