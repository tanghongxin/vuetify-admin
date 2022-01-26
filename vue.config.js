const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CodeframeFormatter = require('stylelint-codeframe-formatter')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const useCDN = isProd && process.env.VUE_APP_ENABLE_CDN === 'true'

const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/styles/index.scss')],
    })
}

const devFontDirPath = '~material-design-icons-iconfont/dist/fonts/'
const prodFontDirPath = 'https://cdn.jsdelivr.net/npm/material-design-icons-iconfont@6.1.0/dist/fonts/'

module.exports = {
  publicPath: './',
  lintOnSave: !isProd,
  css: {
    loaderOptions: {
      sass: {
        // https://www.npmjs.com/package/material-design-icons-iconfont#usage---check-out-the-demo-page
        additionalData: `$material-design-icons-font-directory-path: '${useCDN ? prodFontDirPath : devFontDirPath}';`,
      },
    },
  },
  configureWebpack: {
    devtool: isProd ? false : 'source-map',
  },
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    // HACK: tree shaking does not work on lodash-es directly
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('lodash', path.join(__dirname, './node_modules/lodash-es'))

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type)),
    )

    config.plugin('html')
      .tap(args => {
        const [options] = args
        options.title = process.env.VUE_APP_TITLE

        if (useCDN) {
          config.externals({
            ...config.get('externals'),
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            vuetify: 'Vuetify',
            axios: 'axios',
            'vuetify/dist/vuetify.min.css': 'window',
          })
          
          const { dependencies } = require('./package.json')
          const jsList = ['vue', 'vue-router', 'vuex', 'vuetify', 'axios']
          const cssList = ['vuetify']
          const BASE_URL = 'https://cdn.bootcss.com'
          options.cdn = {
            js: jsList.map(packageName => {
              const name = packageName
              const version = dependencies[packageName].replace('^', '')
              const suffix = `${name}.min.js`
              return [BASE_URL, name, version, suffix].join('/')
            }),
            css: cssList.map(packageName => {
              const name = packageName
              const version = dependencies[packageName].replace('^', '')
              const suffix = `${name}.min.css`
              return [BASE_URL, name, version, suffix].join('/')
            }),
          }
        }
        return args
      })

    if (isProd) {
      config.plugin('lodash')
        .use(new LodashModuleReplacementPlugin({
          shorthands: true,
        }))

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
      
      config.plugin('gzip')
        .use(new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg|jpg|TTF)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.7,
          compressionOptions: {
            level: 5,
          },
          deleteOriginalAssets: false,
        }))
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
