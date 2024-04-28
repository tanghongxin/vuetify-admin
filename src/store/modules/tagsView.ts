import { useSessionStorage } from '@vueuse/core';
import { DEFAULT_ROUTE } from '@/config/routes';
import store from '@/store';
import { WatchStopHandle } from 'vue';

export const useTagsViewStore = defineStore('tagsView', () => {
  const router = useRouter();
  const route = useRoute();

  const views = useSessionStorage('views', []);

  const activeIndex = computed(() =>
    views.value.findIndex((v) => v.path === route.path),
  );

  function setViews(value = []) {
    views.value = value;
  }

  function close(index: number) {
    if (
      views.value[index].path === DEFAULT_ROUTE.path &&
      views.value.length <= 1
    ) {
      return;
    }
    if (index === activeIndex.value) {
      let to;
      if (index <= views.value.length - 2) {
        to = views.value[index + 1];
      } else if (index >= 1) {
        to = views.value[index - 1];
      } else {
        to = { ...DEFAULT_ROUTE };
      }
      router.push(to);
    }
    views.value.splice(index, 1);
  }

  function closeRight(index: number) {
    if (index < activeIndex.value) {
      router.push(views.value[index]);
    }
    views.value = views.value.slice(0, index + 1);
  }

  function closeLeft(index: number) {
    if (index > activeIndex.value) {
      router.push(views.value[index]);
    }
    views.value = views.value.slice(index);
  }

  function closeOthers(index: number) {
    const view = views.value[index];
    router.push(view);
    views.value = [view];
  }

  function switchTo({ ...to }) {
    const index = views.value.findIndex((r) => r.path === to.path);
    const originalView = views.value[index];

    if (index === -1) {
      views.value.push(to);
    } else {
      Object.assign(views.value[index], to);
    }

    if (originalView) {
      // TODO
    }
  }

  let unWatch: WatchStopHandle;

  function useActivate() {
    unWatch = watch(() => route, switchTo, {
      immediate: true,
      deep: true,
    });
  }

  function useDeactivated() {
    unWatch?.();
    unWatch = null;
    setViews([]);
  }

  return {
    views,
    setViews,
    close,
    closeLeft,
    closeRight,
    closeOthers,
    useActivate,
    useDeactivated,
    $reset: useDeactivated,
  };
});

export function getTagsViewStore() {
  return useTagsViewStore(store);
}
