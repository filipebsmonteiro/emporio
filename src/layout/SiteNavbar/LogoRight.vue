<template>
  <nav ref="nav" class="navbar navbar-expand-md">
    <LinksSidebar items-classes="flex-fill d-none d-md-flex" @toggle="$emit('toggle')"/>
    <slot name="brand">
      <span class="h4 mb-0 d-lg-inline-block navbar-brand nav-link">LOGO</span>
    </slot>
  </nav>
</template>

<script>
  import LinksSidebar from '@/layout/SiteNavbar/LinksSidebar'
  export default {
    name: 'LogoRight',
    components: { LinksSidebar }
  }
</script>

<style lang="scss" scoped>

</style>
