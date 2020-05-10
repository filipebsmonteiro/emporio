<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Ações com Cliente</h3>
            </div>
            <div class="col-4 text-right">
              <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
            </div>
          </div>
        </div>
        <template>
          <form @submit.prevent>

            <!-- Fidelidade -->
            <h6 class="heading-small text-muted mb-4">Fidelidade</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-md-6">
                  <base-input label="Adicionar Valor" placeholder="Valor"
                              input-classes="form-control-alternative"
                              v-model="model.valorAcumulado"/>
                </div>
                <div class="col-md-6">
                  <base-input label="Remover Valor" placeholder="Valor"
                              input-classes="form-control-alternative"
                              v-model="model.valorResgate"/>
                </div>
              </div>
            </div>
            <hr class="my-4"/>

            <h6 class="heading-small text-muted mb-4">Dados Usuário</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Nome" input-classes="form-control-alternative" v-model="model.nome" disabled/>
                </div>
                <div class="col-lg-6">
                  <base-input label="CPF" input-classes="form-control-alternative" v-model="model.CPF" disabled/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Telefone" input-classes="form-control-alternative" v-model="model.phone" disabled/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Email" input-classes="form-control-alternative" v-model="model.email" disabled/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Dt. Nascimento"
                              input-classes="form-control-alternative"
                              v-model="model.nascimento" disabled/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Senha" input-classes="form-control-alternative" v-model="model.password"/>
                </div>
              </div>
            </div>
            <hr class="my-4"/>

          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

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
          nome: null,
          CPF: null,
          phone: null,
          email: null,
          nascimento: null,
          password: null,
          valorAcumulado: null,
          valorResgate: null,
        }
      }
    },
    methods: {
      ...mapActions([
        'cliente/listOne'
      ]),
      validaRetornoErro (error) {
        const data = error.response ? error.response.data : null
        if (data.errors && data.message === 'The given data was invalid.') {
          Object.keys(data.errors).map(campo => {
            data.errors[campo].map(msg => {
              this.$notify({
                type: 'danger',
                title: msg,
                verticalAlign: 'bottom',
                horizontalAlign: 'center'
              })
            })
          })
        }
      },
      async onSubmit (evt) {
        evt.preventDefault()

      },
    },
    async mounted () {
      await this['cliente/listOne'](this.$route.params.id)
      this.model = {
        ...this.model,
        ...this.cliente,
        password: null
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
