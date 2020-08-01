<template>
  <div class="row w-100 justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0 mt-5">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Confirme suas credenciais para resetar a senha</small>
          </div>
          <form role="form">
            <base-input class="input-group-alternative mb-3"
                        placeholder="Email"
                        addon-left-icon="ni ni-email-83"
                        v-model="model.email">
            </base-input>

            <base-input class="input-group-alternative mb-3"
                        type="date"
                        placeholder="Data de Nascimento"
                        addon-left-icon="ni ni-calendar-grid-58"
                        v-model="model.nascimento">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="Senha"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="model.password">
            </base-input>

            <base-input class="input-group-alternative"
                        placeholder="Confirmar Senha"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="model.confirm_password">
            </base-input>

            <div class="text-center">
              <base-button type="primary" class="my-4" @click="reset">Resetar Senha</base-button>
            </div>
          </form>
          <div class="row mt-3">
            <div class="col-6">
              <router-link :to="{ name: 'cliente.login' }" class="text-light"><small>Login</small></router-link>
            </div>
            <div class="col-6 text-right">
              <router-link :to="{ name: 'cliente.create' }" class="text-light"><small>Criar uma Conta</small></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from '@/repositories/Auth'

  export default {
    name: 'Esqueceu',
    data() {
      return {
        model: {
          email: '',
          nascimento: '',
          password: '',
          confirm_password: ''
        }
      }
    },
    methods: {
      async reset() {
        if (
          this.model.email === '' ||
          this.model.nascimento === '' ||
          this.model.password === '' ||
          this.model.confirm_password === ''
        ){
          this.$notify({
            type: 'danger',
            title: `Credenciais inválidas!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          return
        }

        await Auth.reset(this.model)
          .then( async () => {
            this.$notify({
              type: 'success',
              title: `Senha atualizada com sucesso!`,
              verticalAlign: 'bottom',
              horizontalAlign: 'center'
            })
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

<style scoped>

</style>
