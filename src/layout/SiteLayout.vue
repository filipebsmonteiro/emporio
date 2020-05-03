<template>
  <div class="content">
    <SiteBaseNav/>
    <FadeTransition :duration="200" mode="out-in">
      <router-view></router-view>
    </FadeTransition>
    <div class="mt-5 mb-5 w-100" style="color: transparent;">.</div>
    <CustomFooter v-if="hasCustomFooter"/>
    <Footer v-else/>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import SiteBaseNav from '@/layout/SiteNavbar/SiteBaseNav'
import Footer from '@/layout/Footer'
import CustomFooter from '@/layout/CustomFooter'
export default {
  name: 'SiteLayout',
  components: {
    CustomFooter,
    Footer,
    SiteBaseNav,
    FadeTransition
  },
  computed: {
    hasCustomFooter() {
      if (parseInt(process.env.VUE_APP_HAS_CUSTOM_FOOTER))
        return true

      return false
    }
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
