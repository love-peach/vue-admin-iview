import menuTree from '@/router/demo.json';

import { AppLayout } from '@/router/pagesComponents';
import menuConponentsTable from '@/router/menuConponentsTable';

const menu = {
  namespaced: true,
  state: {
    collapsed: false,
    menuTreeOriginal: [], // 菜单树结构 源数据
    menuTreeList: [], // 菜单树结构 处理后的结构 需要动态添加的路由中去
    isFinishedRouteAdd: false,
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
  },
  actions: {
    getMenuTreeOriginal({ commit }) {
      console.log('456');
      return new Promise(resolve => {
        setTimeout(() => {
          commit('setMenuTreeOriginal', menuTree.data);
          resolve(menuTree.data);
        }, 1000);
      });
    },
    async generateRoutes({ state, commit, dispatch }) {
      console.log('123');
      await dispatch('getMenuTreeOriginal');
      console.log('789');

      const menuTreeList = state.menuTreeOriginal.map(item => ({
        path: item.url,
        name: item.url,
        icon: 'ios-analytics',
        title: item.text,
        component: AppLayout,
        // 判断一级菜单是否有子菜单
        children: item.childrens
          ? item.childrens.map(child => ({
              path: item.url + child.url,
              name: item.url + child.url,
              icon: 'ios-analytics-outline',
              title: child.text,
              component: menuConponentsTable[`${item.url}${child.url}`],
              meta: {
                // 判断子菜单是否有按钮级别的控制
                btnPermissionsList: child.childrens ? child.childrens.map(btn => btn) : [],
              },
            }))
          : [],
      }));
      console.log('000');

      commit('setMenuTreeList', menuTreeList);
    },
  },
};

export default menu;
