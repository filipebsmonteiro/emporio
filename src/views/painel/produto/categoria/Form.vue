<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
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
                  <base-input alternative=""
                              label="Grupo"
                              placeholder="Grupo"
                              input-classes="form-control-alternative"
                              v-model="model.grupo"
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
  import Categoria from '@/services/Produto/Categoria'

  export default {
    name: 'Form',
    computed: {
      ...mapGetters({
        categoria: 'produto/categoria/getCurrent'
      })
    },
    data () {
      return {
        model: {
          nome: '',
          grupo: '',
        }
      }
    },
    methods: {
      ...mapActions([
        'produto/categoria/listOne'
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
        Categoria.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'painel.produto.categoria.index'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update() {
        Categoria.put(this.categoria.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'painel.produto.categoria.index'})
        }).catch(error => {
          // eslint-disable-next-line no-console
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      if (this.$route.params.id) {
        await this['produto/categoria/listOne'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.categoria
        }
      }
    }
  }
</script>

<style scoped>
</style>
