<template>
  <a @click="handleToggleCollapsed" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <Icon :type="icon" :size="size" />
  </a>
</template>
<style lang="less" scoped src="./sider-trigger.less"></style>
<script src="./sider-trigger.js"></script>
