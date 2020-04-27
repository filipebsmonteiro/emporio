<template>
  <nav ref="nav" class="navbar navbar-expand-md">
    <LinksSidebar
      items-classes="container-fluid justify-content-between d-none d-md-flex"
      @toggle="$emit('toggle')">
      <template>
        <slot name="brand">
          <span class="h4 mb-0 d-lg-inline-block navbar-brand nav-link">LOGO</span>
        </slot>
      </template>
    </LinksSidebar>
  </nav>
</template>

<script>
  import LinksSidebar from '@/layout/SiteNavbar/LinksSidebar'
  export default {
    name: 'LogoCenter',
    components: { LinksSidebar }
  }
</script>

<style lang="scss" scoped>

</style>
