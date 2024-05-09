import { Directive } from 'vue';
import { useKeepScroll } from '@/composables/visibility';

const directive: Directive = {
  mounted(element, binding) {
    const value: string[] | string = binding.value?.length ? binding.value : [];
    const selectors: string[] = Array.isArray(value) ? value : [value];

    const elements = !selectors.length
      ? [element]
      : selectors
          .map((s) => {
            const e = document.querySelector(s);
            if (!e) {
              // eslint-disable-next-line no-console
              console.error(`Element not found: ${s}`);
            }
            return e;
          })
          .filter((e) => !!e);

    elements.forEach((e) => useKeepScroll(e));
  },
};

export default {
  name: 'keep-scroll',
  directive,
};
