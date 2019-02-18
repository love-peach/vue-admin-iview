<template>
  <div class="menu-wrap">
    <div v-show="!collapsed" class="text-center" style="font-size: 2em;">Logo</div>
    <div v-show="collapsed" class="text-center" style="font-size: 1em;">Logo</div>
    <Menu ref="menu" theme="dark" :active-name="activeName" :open-names="openedNames" :accordion="accordion" width="auto" v-show="!collapsed">
      <template v-for="item in menuList">
        <app-menu-item
          v-if="item.children && item.children.length > 0"
          :key="`menu-${item.name}`"
          :parent-item="item"
        ></app-menu-item>
        <menu-item v-else :name="item.name" :key="`menu-single-${item.name}`" :to="{ path: item.path }">
          <span>{{ item.title }}</span>
        </menu-item>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed">
      <template v-for="item in menuList">
        <app-menu-item-collapsed
          v-if="item.children && item.children.length > 0"
          hide-title
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="theme"
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
        ></app-menu-item-collapsed>
        <!-- eslint-disable-next-line -->
        <Tooltip
          v-else
          transfer
          placement="right"
          :content="item.title"
          :key="`drop-menu-single-${item.name}`"
        >
          <a @click="handleSelect(item.name)" class="drop-menu-a" :style="{ textAlign: 'center' }">
            <!-- <Icon type="md-aperture" /> -->
            <common-icon :size="rootIconSize" :color="textColor" :type="item.icon" />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<style src="./app-menu.scss" lang="scss" scoped></style>
<script src="./app-menu.js"></script>
