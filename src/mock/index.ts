import Adaptor from 'axios-mock-adapter';
import { sort } from 'radash';
import request from '@/utils/request';
import adminJson from './admin';
import guestJson from './guest';

const adaptor = new Adaptor(request, { delayResponse: 300 });

adaptor.onPost(/api\/login/).reply((config) => {
  const { username } = JSON.parse(config.data);
  let statusCode;
  let response;
  switch (username.toLowerCase()) {
    case 'admin':
      statusCode = 200;
      response = adminJson;
      break;
    case 'guest':
      statusCode = 200;
      response = guestJson;
      break;
    default:
      statusCode = 401;
      response = { message: '用户名或密码错误' };
      break;
  }

  return [statusCode, response];
});

const item = (id = 1) => ({
  id,
  name: Math.random().toString(36).substring(7),
  time: (Math.random() * 30 + 40).toFixed(0),
  category: Math.random() > 0.5 ? '公共项目' : '其他项目',
  percent: (Math.random() * 30 + 40).toFixed(0),
  price: (Math.random() * 400 + 100).toFixed(0),
  occupy: Math.random() > 0.5,
  type: ['足道', '全身按摩', '中医调理', 'SPA', '套餐'][
    `${Math.abs(Math.random() - 0.5)}`[2]
  ],
  tags: ['除湿', '活血', '助眠', '通气', '养颜'][
    `${Math.abs(Math.random() - 0.5)}`[2]
  ],
  lastModifyTime: new Date(
    +new Date() - Math.floor(Math.random() * 10000000000),
  ),
});

adaptor.onPost(/\/api\/project/).reply(200);
adaptor.onPut(/\/api\/project/).reply(200);
adaptor.onDelete(/\/api\/project\/\d+/).reply(200);
adaptor.onGet(/\/api\/project\/\d+/).reply(200, item());
adaptor.onGet(/\/api\/project\/list/).reply((config) => {
  const { sortBy, itemsPerPage = 15 } = config.params;

  let items = Array(itemsPerPage)
    .fill(null)
    .map((__, i) => item(i));

  if (sortBy?.length) {
    const [{ key, order }] = sortBy;
    items = sort(items, (el) => el[key], order === 'desc');
  }

  return [200, { total: itemsPerPage * 3 + 3, items }];
});
