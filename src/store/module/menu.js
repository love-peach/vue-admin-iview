import menuTree from '@/router/demo.json';

import { AppLayout } from '@/router/pagesComponents';
import menuConponentsTable from '@/router/menuConponentsTable';

import { getBreadCrumbList, routeHasExist, routeEqual, getNextRoute, getQueryFromUrl } from '@/libs/util';
import storage from '@/libs/storage';

import router from '@/router';

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tabList, route);
  state.tabList = state.tabList.filter(item => {
    return !routeEqual(item, route);
  });
  router.push(nextRoute);
};

const menu = {
  namespaced: true,
  state: {
    collapsed: false,
    menuTreeOriginal: [], // 菜单树结构 源数据
    menuTreeList: [], // 菜单树结构 处理后的结构 需要动态添加的路由中去
    isFinishedRouteAdd: false,
    breadCrumbList: [],
    tabList: [],
  },
  getters: {
    menuTreeList: state => {
      return state.menuTreeList;
    },
    finishedRouteAddStatus: state => {
      return state.isFinishedRouteAdd;
    },
  },
  mutations: {
    toggleCollapsed(state, status) {
      state.collapsed = status;
    },
    setMenuTreeOriginal(state, res) {
      state.menuTreeOriginal = res;
    },
    setMenuTreeList(state, res) {
      state.menuTreeList = res;
    },
    toggleFinishedRouteAddStatus(state, data) {
      state.isFinishedRouteAdd = data;
    },
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route);
    },
    setTagNavList(state, list) {
      let tabList = [];
      if (list) {
        tabList = [...list];
      } else {
        tabList = storage.getTabList() || [];
      }
      if (tabList[0] && tabList[0].name !== 'home') {
        tabList.shift();
      }
      let homeTagIndex = tabList.findIndex(item => item.name === 'home');
      if (homeTagIndex > 0) {
        let homeTag = tabList.splice(homeTagIndex, 1)[0];
        tabList.unshift(homeTag);
      }
      state.tabList = tabList;
      storage.setTabList([...tabList]);
    },
    closeTag(state, route) {
      let tag = state.tabList.filter(item => routeEqual(item, route));
      route = tag[0] ? tag[0] : null;
      if (!route) return;
      closePage(state, route);
    },
    addTab(state, { route, type = 'unshift' }) {
      if (!routeHasExist(state.tabList, route)) {
        if (type === 'push') state.tabList.push(route);
        else {
          if (route.name === 'home') state.tabList.unshift(route);
          else state.tabList.splice(1, 0, route);
        }
        storage.setTabList([...state.tabList]);
      }
    },
  },
  actions: {
    getMenuTreeOriginal({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('setMenuTreeOriginal', menuTree.data);
          resolve(menuTree.data);
        }, 1000);
      });
    },
    async generateRoutes({ state, commit, dispatch }) {
      await dispatch('getMenuTreeOriginal');

      const menuTreeList = state.menuTreeOriginal.map(item => ({
        path: item.url,
        name: item.url,
        icon: 'ios-analytics',
        title: item.text,
        component: AppLayout,
        meta: {
          title: item.text,
        },
        // 判断一级菜单是否有子菜单
        children: item.childrens
          ? item.childrens.map(child => ({
              path: (item.url + child.url).split('?')[0],
              name: item.url + child.url,
              query: (item.url + child.url).split('?')[1]
                ? getQueryFromUrl(`?${(item.url + child.url).split('?')[1]}`)
                : '',
              icon: 'ios-analytics-outline',
              title: child.text,
              component: menuConponentsTable[`${item.url}${child.url}`],
              meta: {
                title: child.text,
                // 判断子菜单是否有按钮级别的控制
                btnPermissionsList: child.childrens ? child.childrens.map(btn => btn) : [],
              },
            }))
          : [],
      }));

      commit('setMenuTreeList', menuTreeList);
    },
  },
};

export default menu;
