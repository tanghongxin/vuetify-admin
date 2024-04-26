import Adaptor from 'axios-mock-adapter';
import { sort } from 'radash';
import request from '@/utils/request';
import { HttpStatusCode } from 'axios';
import { randomDate, randomString, uuid } from '@rthx/utils';

import admin from './admin.json';
import guest from './guest.json';

const adaptor = new Adaptor(request, { delayResponse: 300 });

adaptor.onPost(/api\/login/).reply((config) => {
  const { username } = JSON.parse(config.data);
  const key = (username as string).toLowerCase();
  const map = { admin, guest };

  const success = Object.hasOwn(map, key);

  return res(
    HttpStatusCode.Ok,
    success ? map[key] : null,
    success ? '登录成功' : '用户名或密码错误',
    success,
  );
});

adaptor.onPost(/\/api\/project/).reply(() => res());
adaptor.onPut(/\/api\/project/).reply(() => res());

adaptor.onDelete(/\/api\/project\/\d+/).reply(() => res());
adaptor
  .onGet(/\/api\/project\/\d+/)
  .reply(() => res(HttpStatusCode.Ok, item()));

adaptor.onGet(/\/api\/project\/list/).reply((config) => {
  const { sortBy, itemsPerPage = -1 } = config.params;

  const total = itemsPerPage === -1 ? 400 : itemsPerPage * 3 + 3;
  let items = Array(itemsPerPage === -1 ? 400 : itemsPerPage)
    .fill(null)
    .map(() => item());

  if (sortBy?.length) {
    const [{ key, order }] = sortBy;
    items = sort(items, (el) => el[key], order === 'desc');
  }

  return res(HttpStatusCode.Ok, { total, items });
});

async function res<T>(
  httpStatusCode: HttpStatusCode = HttpStatusCode.Ok,
  data: T = null,
  message: string = '',
  success: boolean = true,
) {
  await nextTick();
  return Promise.resolve([
    httpStatusCode,
    { data, message, success } as ApiRes<T>,
  ]);
}

function item() {
  const random = Math.random();

  return {
    id: uuid(),
    name: randomString(),
    time: (random * 100 + 40).toFixed(0),
    category: random > 0.5 ? '常规' : '会员',
    percent: (random * 30 + 40).toFixed(0),
    price: (random * 400 + 100).toFixed(0),
    occupy: random > 0.5,
    type: ['拔罐', '推拿', '足疗'][Math.floor(random * 3)],
    tags: ['除湿', '舒筋', '活血'][Math.floor(random * 3)],
    lastModifyTime: randomDate().valueOf(),
  };
}
