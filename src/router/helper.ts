const modules = import.meta.glob('../views/**/*.vue');

export const dynamicImport = async (path: string, compName?: string) => {
  const comp: any = await modules[`../views/${path}.vue`]();
  if (compName) {
    comp.default.name = compName;
  }
  return comp;
};
