/* eslint-disable no-param-reassign */
/*
 * 递归同步抓取src/views  下所有的Routes.js命名的文件，最终生成src/views/allRoutes.js文件
 * */
const fs = require('fs');
const path = require('path');

// TODO: 控制页面目录
const pagePath = path.join(__dirname, './src/views');
const imports = [];
const routesNames = [];

function getRoutes(filePath, fileName, modulesName) {
  if (!modulesName) {
    modulesName = fileName;
  }

  const stat = fs.statSync(filePath);
  const isDir = stat.isDirectory();
  if (isDir) {
    const files = fs.readdirSync(filePath);
    if (files && files.length) {
      files.forEach(fn => {
        const fp = path.join(filePath, fn);
        getRoutes(fp, fn, modulesName);
      });
    }
  } else if (fileName === 'routes.js') {
    let pathName = filePath.replace(pagePath, '');

    // TODO: 控制选择文件的路径
    let routesPath = `../views${pathName}`;

    if (process.platform.indexOf('win') >= 0) {
      routesPath = routesPath.replace(/\\/g, '/');
    }

    pathName = pathName.replace('.js', '');
    pathName = pathName.split('/');
    routesPath = routesPath.replace('.js', '');

    modulesName = `${`${modulesName}`.replace(/-/g, '_')}`;
    routesNames.push(modulesName);
    imports.push(`import ${modulesName} from '${routesPath}';`);
  }
}

getRoutes(pagePath);
let fileString = '/* eslint-disable */\n';
fileString += imports.join('\n');
fileString += '\n\nexport default [].concat(\n  ';
fileString += routesNames.join(',\n  ');
fileString += ',\n);\n';
// TODO: 控制导出文件的路径
fs.writeFileSync(path.join(__dirname, './src/router/moduleRoutes.js'), fileString);
