<template>
  <div class="d-flex flex-md-fill">
    <div :class="itemsClasses">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'produtos'}">
            <span class="heading">Faça Seu Pedido</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'sobre_nos'}">
            <span class="heading">Sobre Nós</span>
          </router-link>
        </li>
      </ul>

      <slot/>

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'contato'}">
            <span class="heading">Contato</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="logged" class="nav-link" :to="{name: 'cliente'}">
            <span class="heading">Meu Perfil</span>
          </router-link>
        </li>
        <li v-if="logged" class="nav-item" @click="logout">
          <router-link class="nav-link" :to="{name: ''}">
            <span class="heading">Sair</span>
          </router-link>
        </li>
        <li v-else class="nav-item">
          <router-link class="nav-link" :to="{name: 'cliente.login'}">
            <span class="heading">Login</span>
          </router-link>
        </li>
        <li :class="{'nav-item mt--1 mb--2': true, 'mr-5': !logged}">
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

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Auth from '@/services/Auth'
  import TokenService from '@/api/TokenService'

  export default {
    name: 'LinksSidebar',
    props: {
      itemsClasses: {
        type: String,
        default: ''
      },
    },
    computed: {
      ...mapGetters({
        quantidade: 'mainbar/getQuantidade',
        logged: 'mainbar/isLogged'
      }),
    },
    methods: {
      ...mapActions([
        'mainbar/setQuantidade',
        'mainbar/checkLogged',
      ]),
      logout() {
        Auth.logout().then(() => {
          TokenService._clearToken()
          this.$router.push({ name: 'cliente.login' })
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
    mounted () {
      const carrinho = JSON.parse(this.$localStorage.get('carrinho', '[]'))
      this['mainbar/setQuantidade'](carrinho.length)
      this.$router.beforeEach(($to, $from, $next) => {
        this['mainbar/checkLogged']()
        $next()
      })
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
