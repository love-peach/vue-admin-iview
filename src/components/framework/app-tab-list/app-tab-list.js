import { routeEqual } from '@/libs/util';
import beforeClose from '@/router/before-close';

export default {
  name: 'TagsNav',
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: '关闭其他',
        all: '关闭所有',
      },
    };
  },
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    },
  },
  methods: {
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth);
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    handleTagsOption(type) {
      if (type.includes('all')) {
        // 关闭所有，除了home
        let res = this.list.filter(item => item.name === 'home');
        this.$emit('on-close', res, 'all');
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        let res = this.list.filter(item => routeEqual(this.currentRouteObj, item) || item.name === 'home');
        this.$emit('on-close', res, 'others', this.currentRouteObj);
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj);
        }, 100);
      }
    },
    handleClose(current) {
      if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[current.meta.beforeCloseName]).then(close => {
          if (close) {
            this.close(current);
          }
        });
      } else {
        this.close(current);
      }
    },
    close(route) {
      let res = this.list.filter(item => !routeEqual(route, item));
      this.$emit('on-close', res, undefined, route);
    },
    handleClick(item) {
      this.$emit('input', item);
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item);
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding);
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth));
      }
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
    },
    contextMenu(item, e) {
      if (item.name === 'home') {
        return;
      }
      this.visible = true;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      this.contextMenuLeft = e.clientX - offsetLeft + 10;
      this.contextMenuTop = e.clientY - 64;
    },
    closeMenu() {
      this.visible = false;
    },
  },
  watch: {
    $route(to) {
      this.getTagElementByRoute(to);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route);
    }, 200);
  },
};
