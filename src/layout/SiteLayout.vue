<template>
  <div class="content">
    <SiteBaseNav/>
    <FadeTransition :duration="200" mode="out-in">
      <router-view></router-view>
    </FadeTransition>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import SiteBaseNav from '@/layout/SiteNavbar/SiteBaseNav'
export default {
  name: 'SiteLayout',
  components: {
    SiteBaseNav,
    FadeTransition
  }
};
</script>
<style lang="scss" scoped>
  /deep/#main-nav{
    border-left: 1px;
    border-top: 1px;
    border-right: 1px;
    border-bottom: 1px;
    background-color: transparent;
    color: #2bffc6;
  }
</style>
