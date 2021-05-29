module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.extensions.values(['.js', '.vue', '.json', '.less', '.woff', '.ttf', '.ts', '.tsx']);
  },
  // 选项...
  devServer: {
    hot: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:3000', // 源地址
        target: 'http://fe.mission-sun.cn', // 线上地址
        changeOrigin: true, // 改变源
        ws: true,
      },
    }
  }
};
