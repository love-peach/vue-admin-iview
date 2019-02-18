import AppHeader from '@/components/framework/app-header/';
import AppMenu from '@/components/framework/app-menu/';
import AppTabList from '@/components/framework/app-tab-list/';

import { getNewTagList, routeEqual } from '@/libs/util';

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppMenu,
    AppTabList,
  },
  computed: {
    ...mapState('menu', {
      collapsed: state => state.collapsed,
      tabList: state => state.tabList,
    }),
    key() {
      return this.$route.fullPath;
    },
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTab({
        route: { name, query, params, meta },
        type: 'push',
      });
      this.setBreadCrumb(newRoute);
      this.setTagNavList(getNewTagList(this.tabList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    },
  },
  mounted() {
    this.setTagNavList();
    this.addTab({
      route: {
        name: 'home',
        query: '',
        params: {},
        meta: {
          title: '首页',
        },
      },
    });
    this.setBreadCrumb(this.$route);
  },
  methods: {
    ...mapMutations('menu', ['setBreadCrumb', 'setTagNavList', 'addTab', 'closeTag']),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query,
      });
    },
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    handleCloseTag(res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage('home');
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      this.turnToPage(item);
    },
  },
};
