<template>
  <Dropdown
    ref="dropdown"
    @on-click="handleClick"
    :class="hideTitle ? '' : 'collased-menu-dropdown'"
    :transfer="hideTitle"
    :placement="placement"
  >
    <a
      class="drop-menu-a"
      type="text"
      @mouseover="handleMousemove($event, children)"
      :style="{ textAlign: !hideTitle ? 'left' : '' }"
    >
      <common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon" />
      <span class="menu-title" v-if="!hideTitle">{{ parentTitle }}</span>
      <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16" />
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="item in children">
        <app-menu-item-collapsed
          v-if="item.children && item.children.length > 0"
          :icon-size="iconSize"
          :parent-item="item"
          :key="`drop-${item.name}`"
        ></app-menu-item-collapsed>
        <DropdownItem v-else :key="`drop-${item.name}`" :name="item.name">
          <common-icon :size="iconSize" :type="item.icon" />
          <span class="menu-title">{{ item.title }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<style scoped lang="scss">
a.drop-menu-a {
  display: inline-block;
  padding: 6px 15px;
  width: 100%;
  text-align: center;
  color: #495060;
}
.menu-title {
  padding-left: 6px;
  vertical-align: middle;
}
</style>
<script>
import { findNodeUpperByClasses } from '@/libs/util';
import CommonIcon from '@/components/base/common-icon/';
import mixin from './mixin';

export default {
  name: 'AppMenuItemCollapsed',
  mixins: [mixin],
  components: {
    CommonIcon,
  },
  props: {
    parentItem: {
      type: Object,
      default() {
        return {};
      },
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    rootIconSize: {
      type: Number,
      default: 16,
    },
    theme: String,
    iconSize: Number,
  },
  computed: {
    parentName() {
      return this.parentItem.name;
    },
    parentTitle() {
      return this.parentItem.title;
    },
    children() {
      return this.parentItem.children;
    },
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
  },
  data() {
    return {
      placement: 'right-end',
    };
  },
  methods: {
    mounted() {
      let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer']);
      if (dropdown) dropdown.style.overflow = 'visible';
    },
    handleMousemove(event, children) {
      const { pageY } = event;
      const height = children.length * 38;
      const isOverflow = pageY + height < window.innerHeight;
      this.placement = isOverflow ? 'right-start' : 'right-end';
    },
    handleClick(name) {
      this.turnToPage(name);
    },
  },
};
</script>
