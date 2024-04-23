import { useEventBus } from '@vueuse/core';

export type Color = 'success' | 'warning' | 'error' | 'info';

export type Payload = {
  id: string;
  message: string;
  color: Color;
  timeout: number;
};

export default useEventBus<Payload>(Symbol('toast'));
