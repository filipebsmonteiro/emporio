<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item :link="{ text: 'Dashboard', icon: 'ni ni-tv-2 text-primary', name: 'dashboard' }"/>

        <base-dropdown>
          <template v-slot:title>
            <sidebar-item :link="{text: 'Produtos', icon: 'ni ni-collection text-red'}"/>
          </template>
          <template>
            <sidebar-item :link="{text: 'Lista de Produtos', icon: 'ni ni-bullet-list-67 text-blue', name: 'painel.produto.index'}"/>
            <sidebar-item :link="{text: 'Categorias de Produtos', icon: 'ni ni-collection text-red', name: 'painel.produto.categoria.index'}"/>
          </template>
        </base-dropdown>

        <sidebar-item :link="{text: 'Ingredientes', icon: 'ni ni-bullet-list-67 text-blue', name: 'painel.ingrediente.index'}"/>
        <sidebar-item :link="{text: 'Atendimento', icon: 'ni ni-active-40 text-blue', name: 'painel.pedido.index'}"/>

        <base-dropdown>
          <template v-slot:title>
            <sidebar-item :link="{text: 'Marketing', icon: 'ni ni-planet text-red'}"/>
          </template>
          <template>
            <sidebar-item :link="{text: 'Clientes', icon: 'fas fa-users text-green', name: 'painel.cliente.index'}"/>
            <sidebar-item :link="{text: 'Cupons', icon: 'fas fa-ticket-alt', name: 'painel.cupom.index'}"/>
          </template>
        </base-dropdown>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar />

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
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
