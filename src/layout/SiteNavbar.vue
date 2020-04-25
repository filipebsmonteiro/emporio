<template>
  <base-nav id="navbar-main" class="navbar-top navbar-dark bg-gradient-gray-dark" expand>
    <a slot="brand" class="navbar-brand" href="#">Marca</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link nav-link-icon" href="#">
          <!--i class="ni ni-favourite-28"></i-->
          <span class="nav-link-inner--text">Faça Seu Pedido</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-icon" href="#">
          <!--i class="ni ni-favourite-28"></i-->
          <span class="nav-link-inner--text">Sobre Nós</span>
        </a>
      </li>
    </ul>
    <a slot="brand" class="navbar-brand" href="#">Marca</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link nav-link-icon" href="#">
          <!--i class="ni ni-favourite-28"></i-->
          <span class="nav-link-inner--text">Faça Seu Pedido</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-icon" href="#">
          <!--i class="ni ni-favourite-28"></i-->
          <span class="nav-link-inner--text">Sobre Nós</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-icon" href="#">
          <!--i class="ni ni-favourite-28"></i-->
          <span class="nav-link-inner--text">Faça Seu Pedido</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-icon p-0 mb--2" href="#">
          <i class="ni ni-cart ni-2x"/>
            <span class="badge badge-success bg-white text-dark ml-1">24</span>
        </a>
      </li>
    </ul>
    <a slot="brand" class="navbar-brand" href="#">Marca</a>
  </base-nav>
</template>
<script>
  export default {
    name: 'SiteNavbar',
    data () {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      }
    },
    methods: {
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      toggleMenu () {
        this.showMenu = !this.showMenu
      }
    }
  }
</script>
