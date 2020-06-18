<template>
  <div class="row w-100 justify-content-center">
    <div class="col-lg-5 col-md-7 col-sm-8 col-xs-10">
      <div class="card bg-secondary shadow border-0 mt-5">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Acesse com suas credenciais</small>
          </div>
          <form role="form">
            <base-input class="input-group-alternative mb-3"
                        placeholder="Email"
                        addon-left-icon="ni ni-email-83"
                        v-model="model.email">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="Senha"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="model.password">
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Lembrar-me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="login">Entrar</base-button>
              <!--a href="#" class="btn btn-facebook btn-icon">
                <span class="btn-inner--icon"><i class="fas fa-facebook"/></span>
                <span class="btn-inner--text">Facebook</span>
              </a-->
            </div>
          </form>
          <div class="row mt-3">
            <div class="col-6">
              <router-link :to="{ name: 'cliente.esqueceu' }" class="text-primary">
                <small>Esqueceu a senha?</small></router-link>
            </div>
            <div class="col-6 text-right">
              <router-link :to="{ name: 'cliente.create' }" class="text-primary">
                <small>Criar uma conta</small></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from '@/services/Auth'
  import APIService from '@/api/APIService'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    computed: {
      ...mapGetters({
        quantidade_carrinho: 'mainbar/getQuantidade',
      })
    },
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        if (this.model.email === '' || this.model.password === ''){
          this.$notify({
            type: 'danger',
            title: `Credenciais inválidas!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          return
        }

        await Auth.login(this.model)
          .then( async response => {
            await APIService._setToken(response.data.access_token)
            await APIService._setExpiration(response.data.expires_in)

            if (this.quantidade_carrinho > 0){
              this.$router.push({ name: 'carrinho' })
            }else{
              this.$router.push({ name: 'produtos' })
            }

          })
          .catch(() => {
            this.$notify({
              type: 'danger',
              title: `Credenciais inválidas!`,
              verticalAlign: 'bottom',
              horizontalAlign: 'center'
            })
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
