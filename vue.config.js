const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    contentBase: "dist",
    compress: true,
    open: true,
    overlay: {warnings: false, errors: true},
    publicPath: "/",
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    },
    proxy: {
      '^/api': {
        target: 'http://10.100.200.16:8001',
        // target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true
      },
  }
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  },
  productionSourceMap: false,
  // assetsDir: "./testX23/",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {from: "public/img", to: "images"},
      ])
    ]
  },

  lintOnSave: false,
  pluginOptions: {},

  transpileDependencies: ["vue-echarts", "resize-detector"]
};
