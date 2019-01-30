<template>
  <div class="app-layout">
    <div :class="['app-layout-left', collapsed ? 'collapsed' : '']">
      <div class="app-layout-left-inside">
        <app-menu></app-menu>
      </div>
    </div>
    <div :class="['app-layout-right', collapsed ? 'collapsed' : '']">
      <app-header></app-header>
      <div class="app-layout-main-wrap">
        <div class="app-layout-right-content-tab">tab-list</div>
        <div class="app-layout-right-content-main">
          <transition name="slide-fade" mode="out-in">
            <router-view :key="key"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./app-layout.scss" lang="scss" scoped></style>
<script src="./app-layout.js"></script>
