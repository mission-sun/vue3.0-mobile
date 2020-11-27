module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.extensions.values(['.js', '.vue', '.json', '.less', '.woff', '.ttf', '.ts', '.tsx']);
  },
  // 选项...
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://fe.mission-sun.cn/', // 源地址
        changeOrigin: true, // 改变源
        ws: true,
      },
    }
  }
};
