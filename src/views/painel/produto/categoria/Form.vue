<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
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
                              label="Grupo"
                              placeholder="Grupo"
                              input-classes="form-control-alternative"
                              v-model="model.grupo"
                  />
                </div>
                <div class="col-lg-4">
                  <b-form-group label="Layout">
                    <b-select placeholder="Layout"
                              class="form-control-alternative"
                              v-model="model.layout"
                              :options="['Padrão', 'Pizza']"
                    />
                  </b-form-group>
                </div>
              </div>
            </div>
            <hr class="my-4"/>

            <!-- Combinações -->
            <h6 v-if="model.layout === 'Pizza'" class="heading-small text-muted mb-4">Combinações</h6>
            <div v-if="model.layout === 'Pizza'" class="pl-lg-4">
              <div class="row">
                <div class="col-md-6">
                  <b-form-group label="Categoria permite combinações"
                                description="Marque para habilitar produtos fracionados">
                    <b-check v-model="model.permiteCombinacao" switch size="lg"/>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <base-input alternative=""
                              label="Quantidade de combinações"
                              placeholder="Quantidade"
                              type="number" step="1" min="2" max="4"
                              input-classes="form-control-alternative"
                              :disabled="!model.permiteCombinacao"
                              v-model="model.quantidadeCombinacoes"/>
                </div>
              </div>
            </div>
            <hr v-if="model.layout === 'Pizza'" class="my-4"/>

            <!-- Multiplos -->
            <h6 v-if="model.layout === 'Pizza'" class="heading-small text-muted mb-4">Variaçoẽs de Categoria</h6>
            <div v-if="model.layout === 'Pizza'" class="pl-lg-4">
              <IngredienteMultiploList :list="model.multiplos" @update="evt => {model.multiplos = evt}"/>
            </div>

          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Categoria from '@/repositories/Produto/Categoria'
  import IngredienteMultiploList from '@/views/painel/ingrediente/Variacao/IngredienteMultiploList'

  export default {
    name: 'Form',
    components: { IngredienteMultiploList },
    computed: {
      ...mapGetters({
        categoria: 'produto/categoria/current'
      })
    },
    data () {
      return {
        model: {
          nome: '',
          grupo: '',
          layout: '',
          permiteCombinacao: false,
          quantidadeCombinacoes: 2,
          multiplos: [],
        }
      }
    },
    methods: {
      ...mapActions([
        'produto/categoria/listOne'
      ]),
      addVariacao (variacao) {
        const copy = Object.assign({}, variacao)
        this.model.multiplos = [...this.model.multiplos, copy]
      },
      updateVariacao (variacao) {
        this.model.multiplos = this.model.multiplos.map((mult, idx) => {
          if (idx === variacao.index) {
            return variacao
          }
          return mult
        })
      },
      removeVariacao (index) {
        this.model.multiplos = this.model.multiplos.filter((mult, idx) => {
          if (idx !== index) {
            return mult
          }
        })
      },
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
        Categoria.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.produto.categoria.index' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update () {
        Categoria.put(this.categoria.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.produto.categoria.index' })
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
          ...this.categoria,
          permiteCombinacao: !!this.categoria.permiteCombinacao,
        }
      }
    }
  }
</script>

<style scoped>
</style>
