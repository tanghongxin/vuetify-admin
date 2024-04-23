import Toast from './index.vue';
import event, { Color, Payload } from './event';
import { uuid } from '@rthx/utils';

const add =
  (color: Color) =>
  ({ message = '', timeout = 4000 }) => {
    event.emit({ id: uuid(), message, color, timeout } as Payload);
    return;
  };

const toast = {
  success: add('success'),
  warning: add('warning'),
  error: add('error'),
  info: add('info'),
};

export { Toast, toast };
