/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { defineConfig, mergeConfig, loadEnv } from 'vite'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression';
import { visualizer } from "rollup-plugin-visualizer"
import vuetify from 'vite-plugin-vuetify'
import path from 'node:path'
import eslint from 'vite-plugin-eslint';
import VitePluginHtmlEnv from 'vite-plugin-html-env'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isProd = mode === 'production'

  return mergeConfig({
    base: isProd ? '/vuetify-boilerplate/' : './',
    plugins: [
      eslint({
        cache: false,
        exclude: ['**/node_modules/**', '**/dist/**'],
      }),
      VitePluginHtmlEnv(),
      vue(),
      vuetify(),
      ...isProd ? [
        importToCDN({
          modules: [
            autoComplete('vue'),
            autoComplete('axios'),
            {
              name: 'vuex',
              var: 'Vuex',
              path: 'dist/vuex.global.min.js',
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
          template: "treemap", // or sunburst
          open: false,
          gzipSize: true,
          brotliSize: true,
          filename: "bundle-analyze.html",
        }),
      ] : [],
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        "@": path.resolve(__dirname, "/src"),
        "tests": path.resolve(__dirname, "/tests"),
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
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.js'],
      css: {
        include: /.+/,
      },
      deps: {
        inline: ['vuetify'],
      },
      globals: true,
    },
  })
})
