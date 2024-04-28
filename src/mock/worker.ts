import { randomDate, randomString, uuid, isFunction } from '@rthx/utils';
import { sort } from 'radash';
import { HttpStatusCode } from 'axios';

import admin from './admin.json';
import guest from './guest.json';
import projects from './projects.json';

class Mocker {
  static dispatch(request: WorkerSendMsg) {
    const { requestId, message } = request;
    const { type: fn, payload = null } = message;

    if (!isFunction(Mocker[fn])) {
      throw new Error(`No worker handler for type: ${fn}`);
    }

    const response = Mocker[fn](payload);

    self.postMessage({ requestId, response });
  }

  static addProject() {
    return [Mocker.res()];
  }

  static getProjects({ sortBy, page = 1, itemsPerPage = -1 }) {
    const total = projects.length;

    let items = projects;

    if (sortBy?.length) {
      const [{ key, order }] = sortBy;
      items = sort(items, (el) => el[key], order === 'desc');
    }

    items =
      itemsPerPage === -1
        ? items
        : items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    if (sortBy?.length) {
      const [{ key, order }] = sortBy;
      items = sort(items, (el) => el[key], order === 'desc');
    }

    return Mocker.res(HttpStatusCode.Ok, { total, items });
  }

  static deleteProject() {
    return Mocker.res(HttpStatusCode.Ok, Mocker.mockProject());
  }

  static updateProject() {
    return Mocker.res(HttpStatusCode.Ok, Mocker.mockProject());
  }

  static getProjectDetail() {
    return Mocker.res(HttpStatusCode.Ok, Mocker.mockProject());
  }

  static mockProject() {
    const random = Math.random();

    return {
      id: uuid(),
      name: randomString(10),
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

  static login({ username }) {
    const key = username.toLowerCase();
    const map = { admin, guest };

    const success = Object.hasOwn(map, key);

    return Mocker.res(
      HttpStatusCode.Ok,
      success ? map[key] : null,
      success ? '登录成功' : '用户名或密码错误',
      success,
    );
  }

  static res<T>(
    httpStatusCode: HttpStatusCode = HttpStatusCode.Ok,
    data: T = null,
    message: string = '',
    success: boolean = true,
  ) {
    return [httpStatusCode, { data, message, success } as ApiRes<T>];
  }
}

self.onmessage = (event: MessageEvent<WorkerSendMsg>) => {
  Mocker.dispatch(event.data);
};
