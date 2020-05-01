<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Acesse com suas Credenciais ou Facebook</small>
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
              <a href="#" class="btn btn-facebook btn-icon">
                <span class="btn-inner--icon"><i class="fas fa-facebook"/></span>
                <span class="btn-inner--text">Facebook</span>
              </a>
            </div>
          </form>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light"><small>Esqueceu a Senha?</small></a>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light"><small>Criar uma Conta</small></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from '@/services/Auth'
  import TokenService from '@/api/token'

  export default {
    name: 'Login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        if (this.model.email === '' || this.model.password === ''){
          this.$notify({
            type: 'danger',
            title: `Credenciais Inválidas!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          return
        }

        Auth.login(this.model)
          .then(response => {
            TokenService._setToken(response.data.access_token)
            TokenService._setExpiration(response.data.expires_in)
            this.$router.push({ name: 'produtos' })
          })
          .catch(() => {
            this.$notify({
              type: 'danger',
              title: `Credenciais Inválidas!`,
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
