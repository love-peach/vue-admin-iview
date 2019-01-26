<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''" />
      <span>{{ parentTitle }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length > 0">
        <app-menu-item :key="`menu-${item.name}`" :parent-item="item"></app-menu-item>
      </template>
      <template v-else>
        <menu-item :name="item.name" :key="`menu-${item.name}`" :to="{ path: item.path }">
          <span>{{ item.title }}</span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
import CommonIcon from '@/components/base/common-icon/';

export default {
  name: 'AppMenuItem',
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
};
</script>
