const modules = import.meta.glob('../views/**/*.vue');

export const dynamicImport = (path) => (resolve) =>
  modules[`../views/${path}.vue`]().then(resolve);
