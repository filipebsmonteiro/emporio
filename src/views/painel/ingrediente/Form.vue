<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 v-if="$route.params.id" class="mb-0">Editar Categoria</h3>
              <h3 v-else class="mb-0">Nova Categoria</h3>
            </div>
            <div class="col-4 text-right">
              <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
            </div>
          </div>
        </div>
        <template>
          <form @submit.prevent>
            <!--h6 class="heading-small text-muted mb-4">User information</h6-->
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <base-input alternative=""
                              label="Nome"
                              placeholder="Nome"
                              input-classes="form-control-alternative"
                              v-model="model.nome"
                  />
                </div>
                <div class="col-lg-6">
                  <b-form-group label="Status">
                    <b-check v-model="model.status" switch size="lg"/>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-input alternative=""
                              label="Preço"
                              placeholder="Preço"
                              input-classes="form-control-alternative"
                              v-model="model.preco"
                  />
                </div>
                <div class="col-lg-6">
                  <base-input alternative=""
                              label="Código PDV"
                              placeholder="Código PDV"
                              input-classes="form-control-alternative"
                              v-model="model.codigo_PDV"
                  />
                </div>
              </div>
            </div>
            <hr class="my-4" />

          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Ingrediente from '@/services/Ingrediente'

  export default {
    name: 'Form',
    computed: {
      ...mapGetters({
        ingrediente: 'ingrediente/getCurrent'
      })
    },
    data () {
      return {
        model: {
          nome: '',
          status: false,
          preco: 0,
          codigo_PDV: null
        }
      }
    },
    methods: {
      ...mapActions([
        'ingrediente/listOne'
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
        Ingrediente.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'painel.ingrediente.index'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update() {
        Ingrediente.put(this.ingrediente.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'painel.ingrediente.index'})
        }).catch(error => {
          // eslint-disable-next-line no-console
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      if (this.$route.params.id) {
        await this['ingrediente/listOne'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.ingrediente,
          status: !!this.ingrediente.status
        }
      }
    }
  }
</script>

<style></style>
