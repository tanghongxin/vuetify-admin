import { useElementVisibility, useScroll } from '@vueuse/core';

export const useVisibilityLifecycle = (el: any) => {
  const visible = useElementVisibility(el);

  const state = ref<'mounted' | 'activated' | 'deactivated'>(
    visible.value ? 'mounted' : null,
  );

  watch(visible, () => {
    state.value = visible.value ? 'activated' : 'deactivated';
  });

  const isActivated = computed(() => state.value === 'activated');
  const isDeactivated = computed(() => state.value === 'deactivated');

  return { state, isActivated, isDeactivated };
};

export const useKeepScroll = (el: any) => {
  const { x, y } = useScroll(el, { throttle: 100 });
  const { isActivated } = useVisibilityLifecycle(el);

  watch(isActivated, () => {
    if (isActivated.value) {
      el.scrollTop = y.value;
      el.scrollLeft = x.value;
    }
  });
};
