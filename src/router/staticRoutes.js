import * as pagesComponents from './pagesComponents';

// 初始化路由
const initMenu = [
  {
    path: '/login',
    name: 'login',
    title: 'Login - 登录',
    component: pagesComponents.Login,
  },
  {
    path: '/404',
    name: 'error-404',
    title: 'not find',
    component: pagesComponents.Error404,
  },
];

export default initMenu;
