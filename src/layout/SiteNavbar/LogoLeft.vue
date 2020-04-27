<template>
  <nav ref="nav" class="navbar navbar-expand-md">
    <slot name="brand">
      <span class="h4 mb-0 d-lg-inline-block navbar-brand nav-link">LOGO</span>
    </slot>
    <LinksSidebar
      items-classes="flex-fill justify-content-end d-none d-md-flex"
      @toggle="$emit('toggle')"
    />
  </nav>
</template>
<script>
  import LinksSidebar from '@/layout/SiteNavbar/LinksSidebar'

  export default {
    name: 'LogoLeft',
    components: { LinksSidebar }
  }
</script>
