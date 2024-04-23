import vue from '@vitejs/plugin-vue';
import { defineConfig, mergeConfig, loadEnv } from 'vite';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import vuetify from 'vite-plugin-vuetify';
import path from 'node:path';
import eslint from 'vite-plugin-eslint';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isProd = mode === 'production';

  return mergeConfig(
    {},
    {
      base: isProd ? '/vuetify-admin/' : './',
      plugins: [
        AutoImport({
          imports: ['vue', 'vue-router', 'pinia'],
          dts: './auto-imports.d.ts',
        }),
        eslint({
          cache: false,
          exclude: ['**/node_modules/**', '**/dist/**'],
        }),
        vue(),
        vueJsx(),
        vuetify(),
        Components({
          globs: ['src/components/**/index.vue'],
          dts: './types/components.d.ts',
          extensions: ['vue', 'tsx'],
        }),
        codeInspectorPlugin({
          bundler: 'vite',
        }),
        ...(isProd
          ? [
              importToCDN({
                modules: [
                  autoComplete('vue'),
                  autoComplete('@vueuse/core'),
                  {
                    name: 'pinia',
                    var: 'Pinia',
                    path: 'dist/pinia.iife.min.js',
                  },
                  {
                    name: 'vue-router',
                    var: 'VueRouter',
                    path: 'dist/vue-router.global.min.js',
                  },
                ],
              }),
              viteCompression(),
              visualizer({
                template: 'treemap', // or sunburst
                open: false,
                gzipSize: true,
                brotliSize: true,
                filename: 'bundle-analyze.html',
              }),
            ]
          : []),
      ],
      optimizeDeps: {
        include: [
          'vue',
          'pinia',
          'vuetify',
          'axios-mock-adapter',
          'radash',
          'vue-router',
        ],
        entries: ['./src/**/*.vue'],
      },
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
          '@': path.resolve(__dirname, '/src'),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `$material-design-icons-font-directory-path: '${process.env.VITE_MD_ICON_FONT_DIR}';`,
          },
        },
      },
      esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
      },
    },
  );
});
