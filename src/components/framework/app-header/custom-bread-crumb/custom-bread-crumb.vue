<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{ fontSize: `${fontSize}px` }">
      <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
        <common-icon style="margin-right: 4px;" :type="item.icon || ''" />
        {{ item.meta && item.meta.title }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import CommonIcon from '@/components/base/common-icon/';

import './custom-bread-crumb.less';
export default {
  name: 'customBreadCrumb',
  components: {
    CommonIcon,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    fontSize: {
      type: Number,
      default: 14,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
