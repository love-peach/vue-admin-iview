import siderTrigger from './sider-trigger';
import customBreadCrumb from './custom-bread-crumb';

export default {
  name: 'AppHeader',
  components: {
    siderTrigger,
    customBreadCrumb,
  },
  props: {
    collapsed: Boolean,
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.menu.breadCrumbList;
    },
  },
};
