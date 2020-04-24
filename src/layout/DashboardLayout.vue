<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            text: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />

        <sidebar-item :link="{text: 'Categorias de Produtos', icon: 'ni ni-collection text-red', name: 'produto.categoria.index'}"/>
        <sidebar-item :link="{text: 'Produtos', icon: 'ni ni-bullet-list-67 text-blue', name: 'produto.index'}"/>
        <sidebar-item :link="{text: 'Categorias de Ingredientes', icon: 'ni ni-collection text-red', name: 'ingrediente.categoria.index'}"/>
        <sidebar-item :link="{text: 'Ingredientes', icon: 'ni ni-bullet-list-67 text-blue', name: 'ingrediente.index'}"/>
        <sidebar-item :link="{text: 'Atendimento', icon: 'ni ni-planet text-blue', path: 'atendimento'}"/>
        <sidebar-item :link="{text: 'Clientes', icon: 'fas fa-users text-green', path: 'atendimento'}"/>

        <hr>


        <sidebar-item :link="{text: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
        <sidebar-item :link="{text: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/>
        <sidebar-item :link="{text: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <sidebar-item :link="{text: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
        <sidebar-item :link="{text: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/>
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
