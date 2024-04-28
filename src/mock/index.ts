import Adaptor from 'axios-mock-adapter';
import request from '@/utils/request';
import MyWorker from './worker?worker';
import Connector from './Connector';

const conn = new Connector(new MyWorker());

const adaptor = new Adaptor(request, { delayResponse: 400 });

adaptor.onPost(/api\/login/).reply((config) =>
  conn.send({
    type: 'login',
    payload: JSON.parse(config.data),
  }),
);

adaptor.onPost(/\/api\/project/).reply(() =>
  conn.send({
    type: 'addProject',
  }),
);

adaptor.onPut(/\/api\/project/).reply(() =>
  conn.send({
    type: 'updateProject',
  }),
);

adaptor.onDelete(/\/api\/project\/\d+/).reply(() =>
  conn.send({
    type: 'deleteProject',
  }),
);

adaptor.onGet(/\/api\/project\/\d+/).reply(() =>
  conn.send({
    type: 'getProjectDetail',
  }),
);

adaptor.onGet(/\/api\/projects/).reply((config) =>
  conn.send({
    type: 'getProjects',
    payload: config.params,
  }),
);
