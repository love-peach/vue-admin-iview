import { mapState, mapMutations } from 'vuex';

export default {
  name: 'siderTrigger',
  props: {
    icon: {
      type: String,
      default: 'navicon-round',
    },
    size: {
      type: Number,
      default: 26,
    },
  },
  computed: {
    ...mapState('menu', {
      collapsed: state => state.collapsed,
    }),
  },
  methods: {
    ...mapMutations('menu', ['toggleCollapsed']),
    handleToggleCollapsed() {
      this.toggleCollapsed(!this.collapsed);
    },
  },
};
