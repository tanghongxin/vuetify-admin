const path = require('path')

const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/styles/index.scss')],
    })
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('api', path.join(__dirname, 'src/api'))
      .set('~~', path.join(__dirname, 'src/components'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    )
  },
}
