<template>
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md" id="sidenav-main">
    <div class="container-fluid">

      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar"><span class="nav-link fa fa-bars"/></navbar-toggle-button>
      <router-link class="navbar-brand" :to="{ name: 'painel.dashboard' }">
        <img :src="logo" class="navbar-brand-img" alt="...">
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown>
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Avatar" src="/img/brand/avatar.png">
                </span>
              </div>
            </a>

            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link :to="{name: 'painel.profile'}" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <!--router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link-->
            <div class="dropdown-divider"></div>
            <b-button variant="link" class="dropdown-item" @click="logout">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </b-button>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link :to="{ name: 'painel.dashboard' }">
                <img :src="logo">
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links">
          </slot>
        </ul>
        <!--Divider-->
        <hr class="my-3">
        <!--Heading- ->
        <h6 class="navbar-heading text-muted">Documentation</h6>
        <!- -Navigation- ->
        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a class="nav-link"
               href="https://demos.creative-tim.com/vue-argon-dashboard/documentation">
              <i class="ni ni-spaceship"></i> Getting started
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/foundation/colors.html">
              <i class="ni ni-palette"></i> Foundation
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/components/alerts.html">
              <i class="ni ni-ui-04"></i> Components
            </a>
          </li>
        </ul-->
      </div>
    </div>
  </nav>
</template>

<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'
  import AuthPainel from '@/repositories/AuthPainel'
  import APIService from '@/api/APIService'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: '/img/brand/logo.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide () {
      return {
        autoClose: this.autoClose
      }
    },
    methods: {
      closeSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar () {
        this.$sidebar.displaySidebar(true)
      },
      logout() {
        AuthPainel.logout().then(() => {
          APIService._clearToken()
          localStorage.removeItem('perfil')
          window.location.href = `${window.location.origin}/painel/login`
        }).catch(() => {
          this.$notify({
            type: 'danger',
            title: `Erro ao Sair!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
        })
      }
    },
    beforeDestroy () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    }
  }
</script>
