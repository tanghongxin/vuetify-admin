import { useTagsViewStore } from '@/store/modules/tagsView';

const useRouteMatched = () => {
  const route = useRoute();
  return computed(() => route.matched.slice(1));
};

export const useBreadcrumbs = () => {
  const matched = useRouteMatched();
  return computed(() =>
    matched.value.map(({ name }) => {
      const title = name as string;
      return { title };
    }),
  );
};

export const useOpenedMenus = () => {
  const matched = useRouteMatched();
  return computed(() => matched.value.map(({ path }) => path));
};

export const useKeepAliveInclude = () => {
  const { views } = storeToRefs(useTagsViewStore());

  return computed(() =>
    views.value
      .filter(({ meta }) => meta.isKeepAlive)
      .map(({ meta }) => meta.wrapCompName),
  );
};
