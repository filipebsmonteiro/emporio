<template>
    <base-nav id="navbar-main" class="navbar-top navbar-dark" :show-toggle-button="false" expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <!--base-input placeholder="Search" class="input-group-alternative" addon-right-icon="fas fa-search"/-->
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                      <div class="media-body ml-2 d-none d-lg-block">
                          <span class="mb-0 text-sm  font-weight-bold">Olá, Bem-vindo(a)!</span>
                      </div>
                    </div>

                    <template>
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
                        </router-link>
                        <div class="dropdown-divider"></div-->
                        <b-button variant="link" class="dropdown-item" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </b-button>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  import APIService from '@/api/APIService'
  import AuthPainel from '@/repositories/AuthPainel'

  export default {
    name: 'DashboardNavbar',
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
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
    }
  };
</script>
