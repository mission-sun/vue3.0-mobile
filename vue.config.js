module.exports = {
  lintOnSave: false,
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
