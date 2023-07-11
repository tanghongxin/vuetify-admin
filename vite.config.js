import vue from '@vitejs/plugin-vue'
import { defineConfig, mergeConfig, loadEnv } from 'vite'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression';
import { visualizer } from "rollup-plugin-visualizer"
import vuetify from 'vite-plugin-vuetify'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isProd = mode === 'production'
  const useCDN = isProd && process.env.VITE_ENABLE_CDN === 'true'
  const devFontDirPath = 'material-design-icons-iconfont/dist/fonts/'
  const prodFontDirPath = 'https://cdn.jsdelivr.net/npm/material-design-icons-iconfont@6.7.0/dist/fonts/'

  return mergeConfig({
    base: isProd ? '/vuetify-boilerplate/' : './',
    plugins: [
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: {},
        },
      },
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        "@": path.resolve(__dirname, "/src"),
        // TODO
        "lodash": path.resolve(__dirname, "./node_modules/lodash-es"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$material-design-icons-font-directory-path: '${useCDN ? prodFontDirPath : devFontDirPath}';`,
        },
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
  })
})
