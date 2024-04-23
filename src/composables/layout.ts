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
