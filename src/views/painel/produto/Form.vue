<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 v-if="$route.params.id" class="mb-0">Editar Produto</h3>
              <h3 v-else class="mb-0">Novo Produto</h3>
            </div>
            <div class="col-4 text-right">
              <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
            </div>
          </div>
        </div>
        <template>
          <form @submit.prevent>

            <h6 class="heading-small text-muted mb-4">Informações</h6>
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
                              label="Preço"
                              placeholder="Preço"
                              type="number"
                              input-classes="form-control-alternative"
                              v-model="model.preco"
                  />
                </div>
                <div class="col-lg-4">
                  <b-form-group label="Status">
                    <b-select placeholder="Status"
                              class="form-control-alternative"
                              v-model="model.status"
                              :options="['Disponível', 'Indisponível']"
                    />
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <base-input alternative=""
                              label="Unidade de Medida"
                              placeholder="Unidade de Medida"
                              input-classes="form-control-alternative"
                              v-model="model.unidade_medida"
                  />
                </div>
                <div class="col-lg-4">
                  <base-input alternative=""
                              label="Intervalo"
                              placeholder="Intervalo"
                              input-classes="form-control-alternative"
                              v-model="model.intervalo"
                  />
                </div>
                <div class="col-lg-4">
                  <b-form-group label="Categoria">
                    <b-select placeholder="Categoria"
                              class="form-control-alternative"
                              v-model="model.Cat_produtos_idCat_produtos"
                              :options="categorias"
                    />
                  </b-form-group>
                </div>
              </div>
            </div>
            <hr class="my-4" />

            <!-- Promoções -->
            <h6 class="heading-small text-muted mb-4">Promoções</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-md-6">
                  <b-form-group label="Promocionar"
                                description="Marque para Habilitar preço promocional">
                    <b-check v-model="model.promocionar" switch size="lg"/>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <base-input alternative=""
                              label="Valor da Promoção"
                              placeholder="Valor da Promoção"
                              type="number"
                              input-classes="form-control-alternative"
                              :disabled="!model.promocionar"
                              v-model="model.valorPromocao"
                  />
                </div>
              </div>
            </div>
            <hr class="my-4" />

            <!-- Disponibilidades -->
            <h6 class="heading-small text-muted mb-4">Disponibilidade</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-12">
                <b-form-group label="Dias da Semana" class="text-center">
                  <b-form-checkbox v-model="model.domingo" class="ml-1 mr-1 mt-1" button>
                    Domingo</b-form-checkbox>
                  <b-form-checkbox v-model="model.segunda" class="ml-1 mr-1 mt-1" button>
                    Segunda</b-form-checkbox>
                  <b-form-checkbox v-model="model.terca" class="ml-1 mr-1 mt-1" button>
                    Terça</b-form-checkbox>
                  <b-form-checkbox v-model="model.quarta" class="ml-1 mr-1 mt-1" button>
                    Quarta</b-form-checkbox>
                  <b-form-checkbox v-model="model.quinta" class="ml-1 mr-1 mt-1" button>
                    Quinta</b-form-checkbox>
                  <b-form-checkbox v-model="model.sexta" class="ml-1 mr-1 mt-1" button>
                    Sexta</b-form-checkbox>
                  <b-form-checkbox v-model="model.sabado" class="ml-1 mr-1 mt-1" button>
                    Sábado</b-form-checkbox>
                </b-form-group>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-lg-4">
                  <b-form-group label="Períodos">
                    <b-select placeholder="Períodos"
                              class="form-control-alternative"
                              v-model="model.disponibilidade"
                              :options="['Sempre Disponível', '1 Turno', '2 Turnos']"
                    />
                  </b-form-group>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <div class="row">
                      <base-input alternative=""
                                  label="Inicio 1º Período"
                                  type="time"
                                  class="col"
                                  :disabled="model.disponibilidade==='Sempre Disponível'"
                                  placeholder="Inicio 1º Período"
                                  input-classes="form-control-alternative"
                                  v-model="model.inicio_periodo1"
                      />
                      <base-input alternative=""
                                  label="Término 1º Período"
                                  type="time"
                                  class="col"
                                  :disabled="model.disponibilidade==='Sempre Disponível'"
                                  placeholder="Término 1º Período"
                                  input-classes="form-control-alternative"
                                  v-model="model.termino_periodo1"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <div class="row">
                      <base-input alternative=""
                                  label="Inicio 2º Período"
                                  type="time"
                                  class="col"
                                  :disabled="model.disponibilidade==='Sempre Disponível' ||
                                  model.disponibilidade==='1 Turno'"
                                  placeholder="Inicio 2º Período"
                                  input-classes="form-control-alternative"
                                  v-model="model.inicio_periodo2"
                      />
                      <base-input alternative=""
                                  label="Término 2º Período"
                                  type="time"
                                  class="col"
                                  :disabled="model.disponibilidade==='Sempre Disponível' ||
                                  model.disponibilidade==='1 Turno'"
                                  placeholder="Término 2º Período"
                                  input-classes="form-control-alternative"
                                  v-model="model.termino_periodo2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-4" />

            <!-- Multiplos -->
            <h6 class="heading-small text-muted mb-4">Variaçoẽs de Produto</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div v-for="(variacao, index) in model.multiplos" :key="index"  class="col-md-6 mt-3">
                  <Variacao :variacao="variacao"
                            @update="evt => { updateVariacao(index, evt) }"
                            @remove="removeVariacao(index)" />
                </div>
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-block btn-info" @click="addVariacao">Adicionar Variaçao</button>
                </div>
              </div>
            </div>
          </form>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Produto from '@/services/Produto/Produto'
  import Variacao from '@/views/painel/produto/Variacao'

  export default {
    name: 'Form',
    components: { Variacao },
    computed: {
      ...mapGetters({
        produto: 'produto/getCurrent',
        store_categorias: 'produto/categoria/getAll'
      }),
      categorias() {
        if (this.store_categorias && Array.isArray(this.store_categorias)){
          return this.store_categorias.map(c => {
            return {
              value: c.id,
              text: `${c.grupo} - ${c.nome}`
            }
          })
        }
        return []
      },
    },
    data() {
      return {
        variacao_exemplo: {
          nome: null,
          quantidade_min: null,
          quantidade_max: null,
          obrigatorio: true,
          ingredientes: []
        },
        model: {
          nome: null,
          preco: null,
          //imagem: null,
          status: null,
          unidade_medida: null,
          intervalo: null,
          minimo_unidade: null,
          codigo_PDV: null,
          promocionar: false,
          valorPromocao: null,
          Cat_produtos_idCat_produtos: null,
          Lojas_idLojas: 1,
          domingo: false,
          segunda: false,
          terca: false,
          quarta: false,
          quinta: false,
          sexta: false,
          sabado: false,
          disponibilidade: null,
          inicio_periodo1: null,
          termino_periodo1: null,
          inicio_periodo2: null,
          termino_periodo2: null,
          multiplos: []
        }
      }
    },
    methods: {
      ...mapActions([
        'produto/listOne',
        'produto/categoria/listAll'
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
      addVariacao () {
        const copy = Object.assign({}, this.variacao_exemplo)
        this.model.multiplos = [...this.model.multiplos, copy]
      },
      updateVariacao (index, variacao) {
        this.model.multiplos = this.model.multiplos.map((mult, idx) => {
          if (idx === index) {
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
      async onSubmit(evt) {
        evt.preventDefault()
        return
        if (this.$route.params.id) {
          this.update()
        } else {
          this.create()
        }
      },
      create() {
        Produto.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'painel.produto.index'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update() {
        Produto.put(this.produto.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({name: 'painel.produto.index'})
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      await this['produto/categoria/listAll']()
      if (this.$route.params.id) {
        await this['produto/listOne'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.produto,
          domingo: !!this.produto.domingo,
          segunda: !!this.produto.segunda,
          terca: !!this.produto.terca,
          quarta: !!this.produto.quarta,
          quinta: !!this.produto.quinta,
          sexta: !!this.produto.sexta,
          sabado: !!this.produto.sabado,
          promocionar: !!this.produto.promocionar,
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.btn-group-toggle > .btn.btn-secondary.active{
    color: #fff;
    background-color: #2dce89;
    border-color: #2dce89;
    -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
</style>
