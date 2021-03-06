import Vue from 'vue';
import iView from 'iview';
import store from '@/store';
import storaage from '@/libs/storage';

import Router from 'vue-router';
import staticRoutes from './staticRoutes';

import { AppLayout, Home } from './pagesComponents';

Vue.use(Router);

const routes = [
  ...staticRoutes,
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: AppLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
      },
    ],
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

// 免登录白名单
const whiteList = ['/login', '/locking', '/demo/demo_list', '/demo/demo_desc'];

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (storaage.getToken()) {
    if (to.path === '/login') {
      if (from.path === '/home') {
        iView.LoadingBar.finish();
      }
      return next('/home');
    }
    if (!store.getters['menu/finishedRouteAddStatus']) {
      return store
        .dispatch('menu/generateRoutes')
        .then(() => {
          // 生成可访问的路由表
          let syncRoute = [...store.getters['menu/menuTreeList'], { path: '*', redirect: '/404', hidden: true }];
          router.addRoutes(syncRoute); // 动态添加可访问路由表
          store.commit('menu/toggleFinishedRouteAddStatus', true);
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
        .catch(err => {
          console.log('路由动态添加出错', err);
          next('/');
        });
    } else {
      return next();
    }
  } else {
    console.log('没有登录');
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      return next();
    } else {
      return next('/login'); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
