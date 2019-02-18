import { mapState } from 'vuex';
import CommonIcon from '@/components/base/common-icon/';
import AppMenuItem from './app-menu-item.vue';
import AppMenuItemCollapsed from './app-menu-item-collapsed.vue';
import mixin from './mixin';

import { getUnion } from '@/libs/util';

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
    accordion: Boolean,
    activeName: {
      type: String,
      default: '',
    },
    openNames: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openedNames: [],
    };
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
  watch: {
    activeName(name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name);
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
    },
    openNames(newNames) {
      this.openedNames = newNames;
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    },
  },
  methods: {
    handleSelect(name) {
      this.turnToPage(name);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name);
    },
    updateOpenName(name) {
      if (name === 'home') this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(name);
    },
  },
};
