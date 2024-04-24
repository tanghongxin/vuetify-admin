import type { App, Plugin } from 'vue';

const plugin: Plugin = function (app) {
  const imports = import.meta.glob<{ default: (app: App) => void }>(
    ['./**/index.ts'],
    { eager: true },
  );

  const importPaths = Object.keys(imports).sort();

  importPaths.forEach((path) => {
    const pluginImportModule = imports[path];
    pluginImportModule.default?.(app);
  });
};

export default plugin;
