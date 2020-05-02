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
                <base-input alternative=""
                            label="CEP"
                            placeholder="Digite"
                            input-classes="form-control-alternative"
                            v-model="model.CEP"
                />
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
          <hr class="my-4" />
        </form>
      </template>
    </card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import EnderecoRepository from '@/services/Endereco'

  export default {
    name: 'Form',
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
          Referencia: '',
          Ufs_idUfs: 1,
        }
      }
    },
    methods: {
      ...mapActions([
        'endereco/listOne'
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
        if (this.$route.params.id) {
          this.update()
        } else {
          this.create()
        }
      },
      create() {
        EnderecoRepository.post(this.credential).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'endereco.index'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update() {
        EnderecoRepository.put(this.$route.params.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'endereco.index'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      }
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

