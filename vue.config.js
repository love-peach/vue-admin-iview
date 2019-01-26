const path = require('path');
const fs = require('fs');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getLessVariables(file) {
  var themeContent = fs.readFileSync(file, 'utf-8');
  var variables = {};
  themeContent.split('\n').forEach(function(item) {
    if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
      return;
    }
    var _pair = item.split(':');
    if (_pair.length < 2) return;
    var key = _pair[0].replace('\r', '').replace('@', '');
    if (!key) return;
    var value = _pair[1]
      .replace(';', '')
      .replace('\r', '')
      .replace(/^\s+|\s+$/g, '');
    variables[key] = value;
  });
  return variables;
}

module.exports = {
  devServer: {
    port: 8082,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https://www.apiopen.top/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  css: {
    // extract: true,
    loaderOptions: {
      sass: {
        data: '@import "@/styles/base/index.scss";',
      },
      less: {
        modifyVars: getLessVariables(resolve('src/less/variables.less')),
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
  },
};
