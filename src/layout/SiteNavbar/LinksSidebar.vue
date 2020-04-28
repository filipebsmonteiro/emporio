<template>
  <div class="w-100">
    <div :class="itemsClasses">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'produtos'}">
            <span class="heading">Faça Seu Pedido</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'produtos'}">
            <span class="heading">Sobre Nós</span>
          </router-link>
        </li>
      </ul>

      <slot/>

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'produtos'}">
            <span class="heading">Contato</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'produtos'}">
            <span class="heading">Meu Perfil</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'produtos'}">
            <span class="heading">Sair</span>
          </router-link>
        </li>
        <li class="nav-item mt--1 mb--2">
          <router-link class="nav-link p-0" :to="{name: 'carrinho'}">
            <span v-if="quantidade > 0"
              :class="{
                'nav-link badge position-absolute': true,
                'ml--1': quantidade < 10,
                'ml--2': quantidade >= 10
              }">{{ quantidade }}</span>
            <i class="ni ni-cart ni-2x"/>
          </router-link>
        </li>
      </ul>
    </div>

    <b-button class="bg-transparent d-md-none nav-link ml-auto mt--2 pl-2 pt-1 pr-2 pb-1"
              data-toggle="collapse" @click="$emit('toggle')">
      <i class="fas fa-bars fa-2x"/>
    </b-button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'LinksSidebar',
    props: {
      itemsClasses: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters({
        quantidade: 'carrinho/getQuantidade'
      })
    },
    methods: {
      ...mapActions([
        'carrinho/setQuantidade'
      ])
    },
    mounted () {
      const carrinho = JSON.parse(this.$localStorage.get('carrinho', null))
      this['carrinho/setQuantidade'](carrinho.length)
    }
  }
</script>

<style lang="scss" scoped>
  .nav-item {
    .badge {
      color: black !important;
      z-index: 1;
      font-size: 0.9rem;
    }
  }
</style>
