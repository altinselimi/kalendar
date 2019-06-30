module.exports = {
  parallel: true,
  chainWebpack: (config) => {
    config.output
      .globalObject('this')
    config.module.rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
      .end()
  },
};