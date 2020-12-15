<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Empório" title="Empório Virtual">
      <template slot="links">
        <sidebar-item :link="{ text: 'Dashboard', icon: 'ni ni-tv-2 text-primary', name: 'painel.dashboard' }"/>

        <sidebar-item v-if="minimumPerfil('Gerente')">
          <a v-b-toggle.produto-sidebar class="nav-link">
            <i class="ni ni-collection text-red"/>
            <span class="nav-link-text">Produtos</span>
          </a>
          <b-collapse id="produto-sidebar">
            <sidebar-item :link="{text: 'Lista de Produtos', icon: 'ni ni-bullet-list-67 text-blue', name: 'painel.produto.index'}"/>
            <sidebar-item :link="{text: 'Categorias', icon: 'ni ni-collection text-red', name: 'painel.produto.categoria.index'}"/>
          </b-collapse>
        </sidebar-item>
        <sidebar-item :link="{text: 'Ingredientes', icon: 'ni ni-bullet-list-67 text-success', name: 'painel.ingrediente.index'}"/>

        <sidebar-item :link="{text: 'Atendimento', icon: 'ni ni-active-40 text-indigo', name: 'painel.pedido.index'}"/>

        <sidebar-item v-if="minimumPerfil('Gerente')">
          <a v-b-toggle.marketing-sidebar class="nav-link">
            <i class="ni ni-planet text-red"/>
            <span class="nav-link-text">Marketing</span>
          </a>
          <b-collapse id="marketing-sidebar">
            <sidebar-item :link="{text: 'Clientes', icon: 'fas fa-users text-green', name: 'painel.cliente.index'}"/>
            <sidebar-item :link="{text: 'Cupons', icon: 'fas fa-ticket-alt', name: 'painel.cupom.index'}"/>
          </b-collapse>
        </sidebar-item>

        <sidebar-item v-if="minimumPerfil('Admin')"
                      :link="{text: 'Usuários', icon: 'ni ni-single-02 text-yellow', name: 'painel.usuario.index'}"/>

        <sidebar-item v-if="minimumPerfil('Lojista')"
                      :link="{text: 'Lojas', icon: 'ni ni-building text-orange', name: 'painel.loja.index'}"/>

        <sidebar-item v-if="minimumPerfil('Lojista')"
                      :link="{text: 'CEPs', icon: 'ni ni-square-pin text-pink', name: 'painel.ceps'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar/>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import { FadeTransition } from 'vue2-transitions'

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data () {
    return {
      sidebarBackground: 'orange' //vue|blue|orange|green|red|primary
    }
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    minimumPerfil (perfil) {
      const PERFIL = localStorage.getItem('perfil')
      if (perfil === 'Admin' && PERFIL !== 'Admin'){
        return false
      }
      if (perfil === 'Lojista' && !['Admin', 'Lojista'].includes(PERFIL) ){
        return false
      }
      if (perfil === 'Gerente' && !['Admin', 'Lojista', 'Gerente'].includes(PERFIL) ){
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.nav-item {
  cursor: pointer;

  .nav-link {
    border-radius: 20rem;

    &:hover {
      background-color: rgba(128, 128, 128, 0.5);
    }

    .nav-link-text{
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
  }

  .collapse {
    margin-left: 2rem !important;
    border-radius: 0 0 22px 22px;
    box-shadow: -2px 1px 0px 1px #aaaaaa;
  }
}

@media (min-width: 768px) {
  .navbar-vertical.navbar-expand-md .navbar-nav .nav-link {
    margin: 0rem 1rem !important;
    padding: 0.5rem !important;
  }
}
</style>
