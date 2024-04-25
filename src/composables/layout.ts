import { useTagsViewStore } from '@/store/modules/tagsView';

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
  const { views } = storeToRefs(useTagsViewStore());

  return computed(() =>
    views.value
      .filter(({ meta }) => meta.isKeepAlive)
      .map(({ meta }) => meta.compName),
  );
};
