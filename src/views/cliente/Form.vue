<template>
  <div class="container">
    <card shadow type="secondary">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-8">
            <h3 v-if="$route.name === 'cliente.auto_editar'" class="mb-0">Editar Meus Dados</h3>
            <h3 v-else class="mb-0">Novo Cliente</h3>
          </div>
          <div class="col-4 text-right">
            <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
          </div>
        </div>
      </div>
      <template>
        <form @submit="onSubmit">
          <h6 class="heading-small text-muted mb-4">Meus Dados</h6>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Nome"
                            placeholder="Nome"
                            input-classes="form-control-alternative"
                            v-model="model.nome"
                />
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="CPF"
                            placeholder="000.000.000-00"
                            input-classes="form-control-alternative"
                            v-model="model.cpf"
                />
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Sexo"
                            type="é Uma SELECT"
                            placeholder="jesse@example.com"
                            input-classes="form-control-alternative"
                            v-model="model.sexo"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Telefone"
                            placeholder="Telefone"
                            input-classes="form-control-alternative"
                            v-model="model.phone"
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Data de Nascimento"
                            placeholder="Nascimento"
                            input-classes="form-control-alternative"
                            type="date"
                            v-model="model.nascimento"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Email"
                            placeholder="nome@email.com"
                            input-classes="form-control-alternative"
                            v-model="model.email"
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Senha"
                            type="password"
                            placeholder=" + + + +"
                            input-classes="form-control-alternative"
                            v-model="model.password"
                />
              </div>
            </div>
          </div>
          <hr class="my-4"/>
        </form>
      </template>
    </card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ClienteRepository from '@/services/Cliente'

  export default {
    name: 'Form',
    computed: {
      ...mapGetters({
        cliente: 'cliente/getCurrent'
      })
    },
    data () {
      return {
        model: {
          nome: '',
          CPF: '',
          phone: '',
          email: '',
          password: '',
          nascimento: '',
          sexo: '',
        }
      }
    },
    methods: {
      ...mapActions([
        'cliente/listMe'
      ]),
      validaRetornoErro(error) {
        const data = error.response ? error.response.data : null
        if ( data.errors && data.message === "The given data was invalid.") {
          Object.keys(data.errors).map(campo => {
            data.errors[campo].map(msg => {
              this.$notify({
                type: 'danger',
                title: msg,
                verticalAlign: 'bottom',
                horizontalAlign: 'center'
              })
            })
          });
        }
      },
      async onSubmit(evt) {
        evt.preventDefault()
        if (this.$route.name === 'cliente.auto_editar') {
          this.update()
        } else {
          this.create()
        }
      },
      create() {
        ClienteRepository.post(this.credential).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'cliente'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update() {
        ClienteRepository.put(this.cliente.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'cliente'})
        }).catch(error => {
          // eslint-disable-next-line no-console
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      if (this.$route.name === 'cliente.auto_editar') {
        await this['cliente/listMe'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.cliente
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
