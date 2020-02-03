<template>
  <div>
    <b-navbar toggleable="lg" class="barraNavegacao">
      <b-navbar-brand to="/" class="barraNavegacao__logo">
        Empório
      </b-navbar-brand>
      <!-- Indica collapse em caso de mobile -->
      <b-navbar-toggle target="nav-collapse" />
      <!-- Itens do collapse -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="barraNavegacao__navbar">
          <b-nav-item to="/cardapio" class="barraNavegacao__navbar__item">
            Cardápio
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto barraNavegacao__navbar">
          <b-nav-item-dropdown class="barraNavegacao__navbar__item" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              User
            </template>
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Default'
}
</script>
<style lang="scss" scoped>
  .barraNavegacao{
    background-color: $navbar-bg-color;
    border-left: $navbar-border-color $navbar-border-left-px $navbar-border-left-type;
    border-top: $navbar-border-color $navbar-border-top-px $navbar-border-top-type;
    border-right: $navbar-border-color $navbar-border-right-px $navbar-border-right-type;
    border-bottom: $navbar-border-color $navbar-border-bottom-px $navbar-border-bottom-type;
    color: $navbar-text-color;
    a{
      color: $navbar-logo-text-color !important;
    }
    button{
      background-color: $navbar-button-bg-color !important;
    }
    &__{
      &navbar {
        &__{
          &item{
            /deep/ a {
              color: $navbar-text-color !important;
              &:hover{
                color: $navbar-text-color-hover !important;
              }
            }
          }
        }
      }
    }
  }
</style>
