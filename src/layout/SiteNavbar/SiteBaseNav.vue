<template>
  <div :class="{'container rounded': sidebar.container}">
    <div id="navbar-main">
      <Component :is="sidebar.logo" :class="` logo-${sidebar.logoSize}`" @toggle="sidebarShow = !sidebarShow" >
        <template  v-slot:brand>
          <router-link to="/">
            <img ref="logo" src="/img/brand/logo.png"/>
          </router-link>
        </template>
      </Component>
      <slot name="button">

      </slot>
      <b-sidebar id="sidebar-main" bg-variant="white" text-variant="danger" :visible="sidebarShow" shadow>
        <div class="px-3 py-2">
          <LinksSidebar/>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
  import LogoLeft from '@/layout/SiteNavbar/LogoLeft'
  import LogoCenter from '@/layout/SiteNavbar/LogoCenter'
  import LogoRight from '@/layout/SiteNavbar/LogoRight'
  import LinksSidebar from '@/layout/SiteNavbar/LinksSidebar'
  export default {
    name: 'SiteBaseNav',
    components: {
      LinksSidebar,
      LogoLeft,
      LogoCenter,
      LogoRight
    },
    props: {
      sidebar: {
        type: Object,
        default: () => {
          return {
            logo: `${process.env.VUE_APP_LAYOUT_MENU_POSITION}`,
            logoSize: `${process.env.VUE_APP_LAYOUT_MENU_LOGO}`,
            container: !parseInt(process.env.VUE_APP_LAYOUT_MENU_FULL)
          }
        }
      }
    },
    data() {
      return {
        sidebarShow: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/#navbar-main {
    nav {
      &.logo-sm {
        img {
          height: 4rem;
          margin-top: -1rem;
          margin-bottom: -1rem !important;
        }
      }
      &.logo-md {
        margin-top: 1rem !important;
        margin-bottom: 1.5rem !important;
        img {
          height: 6rem;
          margin-top: -2rem !important;
          margin-bottom: -2.5rem !important;
        }
      }
      &.logo-lg {
        margin-top: 1.5rem !important;
        margin-bottom: 2rem !important;
        img {
          height: 7rem;
          margin-top: -2.5rem !important;
          margin-bottom: -3rem !important;
        }
      }
    }
  }
</style>
