import { useSessionStorage } from '@vueuse/core';
import { DEFAULT_ROUTE } from '@/router/routes';
import store from '@/store';
import { WatchStopHandle } from 'vue';

export const useTagsViewStore = defineStore('tagsView', () => {
  const router = useRouter();
  const route = useRoute();

  const views = useSessionStorage('views', []);

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

    if (views.value[index].fullPath === route.fullPath) {
      let to;
      if (index <= views.value.length - 2) {
        to = views.value[index + 1].fullPath;
      } else if (index >= 1) {
        to = views.value[index - 1].fullPath;
      } else {
        to = DEFAULT_ROUTE.path;
      }
      router.push(to);
    }

    views.value.splice(index, 1);
  }

  function closeRight(index: number) {
    views.value = views.value.slice(0, index + 1);
  }

  function closeLeft(index: number) {
    views.value = views.value.slice(index);
  }

  function closeOthers(index: number) {
    views.value = views.value[index];
  }

  function switchTo({ ...to }) {
    const index = views.value.findIndex((r) => r.fullPath === to.fullPath);
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
