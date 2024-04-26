const modules = import.meta.glob('../views/**/*.vue');

export const dynamicImport = (path: string, compName?: string) => {
  return async () => {
    const comp: any = await modules[`../views/${path}.vue`]();
    if (compName) comp.default.name = compName;
    return comp;
  };
};
