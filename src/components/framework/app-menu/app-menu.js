import { mapState } from 'vuex';
import CommonIcon from '@/components/base/common-icon/';
import AppMenuItem from './app-menu-item.vue';
import AppMenuItemCollapsed from './app-menu-item-collapsed.vue';
import mixin from './mixin';

export default {
  name: 'AppMenu',
  mixins: [mixin],
  components: {
    AppMenuItem,
    AppMenuItemCollapsed,
    CommonIcon,
  },
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
    rootIconSize: {
      type: Number,
      default: 20,
    },
    iconSize: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('menu', {
      collapsed: state => state.collapsed,
      menuList: state => state.menuTreeList,
    }),
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
  },
  methods: {
    handleSelect(name) {
      this.turnToPage(name);
    },
  },
};
