// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var commond = require('./command.js')
var projectName = commond.projectName

module.exports = {
  projectName: projectName,
  apiHost: 'https://test.m.shanhs.com.cn/sapi',
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, `../dist/${projectName}/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist/${projectName}`),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular statics hosts such as
    // Surge or Netlify already gzip all statics assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    // 在小程序开发者工具中不需要自动打开浏览器
    autoOpenBrowser: false,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
