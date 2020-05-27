// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    extract: { ignoreOrder: true },
  },
  // configureWebpack: {
  //   plugins: [new BundleAnalyzerPlugin()]
  // }
};
