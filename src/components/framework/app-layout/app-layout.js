import AppHeader from '@/components/framework/app-header/';
import AppMenu from '@/components/framework/app-menu/';

import { mapState } from 'vuex';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppMenu,
  },
  computed: {
    ...mapState('menu', {
      collapsed: state => state.collapsed,
    }),
    key() {
      return this.$route.fullPath;
    },
  },
};
