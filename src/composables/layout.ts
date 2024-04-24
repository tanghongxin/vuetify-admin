import { useRuntimeStore } from '@/store/modules/runtime';

export const useBreadcrumbs = () => {
  const route = useRoute();
  return computed(() =>
    route.matched
      .map(({ name }) => {
        const title = name as string;
        return { title };
      })
      .slice(1),
  );
};

export const useKeepAliveInclude = () => {
  const { openedRoutes } = storeToRefs(useRuntimeStore());

  return computed(() =>
    openedRoutes.value
      .filter(({ meta }) => meta.isKeepAlive)
      .map(({ meta }) => meta.compName),
  );
};
