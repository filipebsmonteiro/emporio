<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Loja</h3>
            </div>
            <div class="col-4 text-right">
              <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
            </div>
          </div>
        </div>
        <template>
          <form @submit.prevent>

            <h6 class="heading-small text-muted mb-4">Dados da Loja</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Fantasia" input-classes="form-control-alternative" v-model="model.fantasia"/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Razão Social" input-classes="form-control-alternative" v-model="model.razao_social"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="CNPJ" input-classes="form-control-alternative" v-model="model.CNPJ"/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Abreviação" input-classes="form-control-alternative" v-model="model.abreviacao"/>
                </div>
              </div>
            </div>
            <hr class="my-4"/>

            <h6 class="heading-small text-muted mb-4">Dados de Contato</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-4">
                  <base-input label="CEP" input-classes="form-control-alternative" v-model="model.CEP"/>
                </div>
                <div class="col-lg-8">
                  <base-input label="Logradouro" input-classes="form-control-alternative" v-model="model.Logradouro"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Bairro" input-classes="form-control-alternative" v-model="model.Bairro"/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Cidade" input-classes="form-control-alternative" v-model="model.Cidade"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Latitude" type="number" input-classes="form-control-alternative" v-model="model.latitude"/>
                </div>
                <div class="col-lg-6">
                  <base-input label="Longitude" type="number" input-classes="form-control-alternative" v-model="model.longitude"/>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input label="Telefone" input-classes="form-control-alternative" v-model="model.phone"/>
                </div>
              </div>
            </div>
            <hr class="my-4"/>

            <h6 class="heading-small text-muted mb-4">Dados de Vendas</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-4">
                  <b-form-group label="Aceita agendamentos">
                    <b-check v-model="model.agendamentos" switch size="lg"/>
                  </b-form-group>
                </div>
                <div class="col-lg-4">
                  <b-form-group label="Aceita pagamentos online">
                    <b-check v-model="model.pagamentosOnline" switch size="lg"/>
                  </b-form-group>
                </div>
                <div class="col-lg-4">
                  <base-input label="Valor mínimo de pedido" type="number" min="0" input-classes="form-control-alternative" v-model="model.vlr_minimo_pedido"/>
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
  import Loja from '@/repositories/Loja'

  export default {
    name: 'Form',
    computed: {
      ...mapGetters({
        loja: 'loja/current'
      })
    },
    data () {
      return {
        model: {
      fantasia: '',
      CNPJ: '',
      razao_social: '',
      abreviacao: '',
      phone: '',
      CEP: '',
      Logradouro: '',
      Bairro: '',
      Cidade: '',
      latitude: 0,
      longitude: 0,
      vlr_minimo_pedido: 0,
      agendamentos: false,
      pagamentosOnline: true,
        }
      }
    },
    methods: {
      ...mapActions([
        'loja/listOne'
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
        if (this.$route.params.id) {
          this.update()
        } else {
          this.create()
        }
      },
      create () {
        Loja.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.loja.index' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update () {
        Loja.put(this.loja.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.loja.index' })
        }).catch(error => {
          // eslint-disable-next-line no-console
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      await this['loja/listOne'](this.$route.params.id)
      this.model = {
        ...this.model,
        ...this.loja,
        agendamentos: this.loja.agendamentos ? !!this.loja.agendamentos : false,
        pagamentosOnline: this.loja.pagamentosOnline ? !!this.loja.pagamentosOnline : true,
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
