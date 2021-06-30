const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CodeframeFormatter = require('stylelint-codeframe-formatter')

const isProd = process.env.NODE_ENV === 'production'

const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/styles/index.scss')],
    })
}

module.exports = {
  publicPath: './',
  lintOnSave: !isProd,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )

    if (isProd) {
      // cdn
      config.plugin('html')
        .tap(args => {
          const [options] = args
          const dependencies = require('./package.json')['dependencies']
          const jsList = ['vue', 'vue-router', 'vuex', 'vuetify', 'axios']
          const BASE_URL = 'https://cdn.bootcss.com'
          options.cdn = {
            js: jsList.map(packageName => {
              const name = packageName
              const version = dependencies[packageName].replace('^', '')
              const suffix = `${name}.min.js`
              return [BASE_URL, name, version, suffix].join('/')
            }),
          }
          return [
            options,
          ]
        })
      
      // cdn global variables
      config.externals({
        ...config.get('externals'),
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        vuetify: 'Vuetify',
        axios: 'axios',
      })

      // lodash tree-shaking
      config.plugin('lodash')
        .use(LodashModuleReplacementPlugin)
      
      // code minify
      config.plugin('terser')
        .use(TerserPlugin, [{
          test: /\.js|\.vue$/,
          exclude: /node_modules/,
          terserOptions: {
            compress: {
              drop_console: true,
              toplevel: true,
            },
            output: {
              comments: false,
            },
          },
        }])
    } else {
      config.plugin('stylelint')
        .use(StyleLintPlugin, [{
          cache: true,
          emitErrors: true,
          failOnError: false,
          formatter: CodeframeFormatter,
          files: ['**/*.{html,vue,css,sass,scss}'],
          fix: true,
        }])
    }
  },
}
