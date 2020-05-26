<template>
  <div class="container">
    <card shadow type="secondary">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-8">
            <h3 class="mb-0">Endereço</h3>
          </div>
          <div class="col-4 text-right">
            <b-button variant="primary" @click="onSubmit">Salvar</b-button>
          </div>
        </div>
      </div>
      <template>
        <form @submit.prevent>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-4">
                <b-form-group label="CEP *" label-class="form-control-label">
                  <b-form-input placeholder="Digite" v-model="model.CEP" v-mask="'#####-###'" @keyup="procuraCep"/>
                </b-form-group>
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Cidade"
                            placeholder="Cidade"
                            input-classes="form-control-alternative"
                            v-model="model.Cidade"
                />
              </div>
              <div class="col-lg-4">
                <base-input alternative=""
                            label="Bairro"
                            placeholder="Bairro"
                            input-classes="form-control-alternative"
                            v-model="model.Bairro"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <base-input alternative=""
                            label="Logradouro"
                            placeholder="Logradouro"
                            input-classes="form-control-alternative"
                            v-model="model.Logradouro"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <base-input alternative=""
                            label="Referência"
                            placeholder="Referência"
                            input-classes="form-control-alternative"
                            v-model="model.Referencia"
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
  import EnderecoRepository from '@/services/Endereco'
  import { mask } from 'vue-the-mask'
  import axios from 'axios'

  export default {
    name: 'Form',
    directives: { mask },
    computed: {
      ...mapGetters({
        endereco: 'endereco/getCurrent'
      })
    },
    data () {
      return {
        model: {
          CEP: '',
          Logradouro: '',
          Bairro: '',
          Cidade: '',
          Referencia: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'endereco/listOne'
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
        EnderecoRepository.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'endereco.index' })
        }).catch(error => {
          this.validaRetornoErro(error)
          if (error.response.status === 400) {
            this.$notify({
              type: 'danger',
              title: error.response.data.message,
              verticalAlign: 'bottom',
              horizontalAlign: 'center'
            })
          }
        })
      },
      update () {
        EnderecoRepository.put(this.$route.params.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'endereco.index' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      procuraCep () {
        // Nova variável "cep" somente com dígitos.
        const cep = this.model.CEP.replace(/\D/g, '')

        // Verifica se campo cep possui valor informado.
        if (cep.length > 7) {
          // Expressão regular para validar o CEP.
          const validacep = /^[0-9]{8}$/

          //Valida o formato do CEP.
          if (validacep.test(cep)) {

            // Preenche os campos com "..." enquanto consulta webservice.
            this.model.Logradouro = '...'
            this.model.Bairro = '...'
            this.model.Cidade = '...'

            //Consulta o webservice viacep.com.br/
            axios.get('//viacep.com.br/ws/' + cep + '/json/?callback=').then(dados => {
              if (!dados.erro) {
                const end = dados.data
                //Atualiza os campos com os valores da consulta.
                this.model.Logradouro = `${end.logradouro} ${end.localidade} ${end.complemento}`
                this.model.Bairro = end.bairro
                this.model.Cidade = end.cidade

              }
            }).catch(() =>{
              this.model.Logradouro = ''
              this.model.Bairro = ''
              this.model.Cidade = ''
            })
          }
        }
      },
    },
    async mounted () {
      if (this.$route.params.id) {
        await this['endereco/listOne'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.endereco
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

