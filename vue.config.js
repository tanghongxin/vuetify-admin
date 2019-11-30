const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CodeframeFormatter = require('stylelint-codeframe-formatter')

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
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('api', path.join(__dirname, 'src/api'))
      .set('~~', path.join(__dirname, 'src/components'))

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer([
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new LodashModuleReplacementPlugin(),
      ])
    }

    config.plugin('stylelint')
      .use(StyleLintPlugin, [{
        cache: true,
        emitErrors: true,
        failOnError: false,
        formatter: CodeframeFormatter,
        files: ['**/*.{html,vue,css,sass,scss}'],
        fix: true,
      }])
      .end()

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )
  },
}
