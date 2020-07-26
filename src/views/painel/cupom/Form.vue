<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <card shadow type="secondary">
        <div slot="header" class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Gerador de Cupom</h3>
            </div>
            <div class="col-4 text-right">
              <b-btn variant="primary" @click="onSubmit">Salvar</b-btn>
            </div>
          </div>
        </div>
        <template>
          <form @submit.prevent>
            <h6 class="heading-small text-muted mb-4">User information</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-md-6">
                  <b-form-group label="Tipo de Cupom"
                                description="Determina o Código do Cupom"
                                label-class="form-control-label">
                    <b-form-select v-model="model.codigo" :options="tiposDeCupons"/>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <base-input label="Texto"
                              placeholder="Texto Após o Código do Cupom"
                              input-classes="form-control-alternative"
                              v-model="model.hash"/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <base-input label="Validade"
                              type="date"
                              input-classes="form-control-alternative"
                              v-model="model.validade"/>
                </div>
                <div class="col-md-4">
                  <base-input label="Quantidade"
                              placeholder="Número de utilizações autoriadas"
                              input-classes="form-control-alternative"
                              v-model="model.quantidade"/>
                </div>
                <div class="col-md-4">
                  <base-input v-if="model.codigo === 'B'"
                              label="Porcentagem"
                              placeholder="Porcentagem de desconto do Cupom"
                              input-classes="form-control-alternative"
                              v-model="model.porcentagem"/>
                  <base-input v-else-if="model.codigo === 'C'"
                              label="Valor"
                              placeholder="Valor de desconto do Cupom"
                              input-classes="form-control-alternative"
                              v-model="model.valor"/>
                  <b-form-group v-else-if="model.codigo === 'D'"
                                label="Categoria" description="Categoria do Cupom"
                                label-class="form-control-label">
                    <b-select v-model="model.Cat_produtos_idCat_produtos"
                              text-field="nome"
                              value-field="id"
                              :options="categorias_produtos"/>
                  </b-form-group>
                  <b-form-group v-else-if="model.codigo === 'E'"
                                label="Produto" description="Produto do Cupom"
                                label-class="form-control-label">
                    <b-select v-model="model.Produtos_idProdutos"
                              text-field="nome"
                              value-field="id"
                              :options="produtos"/>
                  </b-form-group>
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
  import Cupom from '@/services/Cupom'

  export default {
    name: 'Form',
    computed: {
      ...mapGetters({
        tipos_cupons: 'cupom/getTipos',
        cupom: 'cupom/getCurrent',
        categorias_produtos: 'produto/categoria/getAll',
        produtos: 'produto/getAll',
      }),
      tiposDeCupons () {
        let array_tipos = []
        for (var [index, value] of Object.entries(this.tipos_cupons)) {
          array_tipos = [...array_tipos, {
            text: value,
            value: index
          }]
        }
        return array_tipos
      }
    },
    data () {
      return {
        model: {
          codigo: null,
          validade: null,
          quantidade: null,
          hash: null,
          porcentagem: null,
          valor: null,
          Cat_produtos_idCat_produtos: null,
          Produtos_idProdutos: null
        }
      }
    },
    methods: {
      ...mapActions([
        'cupom/listTipos',
        'cupom/listOne',
        'produto/categoria/listAll',
        'produto/listAll',
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
        Cupom.post(this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Salvos com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.cupom.index' })
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      },
      update () {
        Cupom.put(this.cupom.id, this.model).then(() => {
          this.$notify({
            type: 'success',
            title: `Dados Atualizados com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this.$router.push({ name: 'painel.cupom.index' })
        }).catch(error => {
          // eslint-disable-next-line no-console
          this.validaRetornoErro(error)
        })
      }
    },
    async mounted () {
      this['cupom/listTipos']()
      this['produto/categoria/listAll']()
      this['produto/listAll']()
      if (this.$route.params.id) {
        await this['cupom/listOne'](this.$route.params.id)
        this.model = {
          ...this.model,
          ...this.cupom,
          validade: this.cupom.validade.replace(' 00:00:00', '')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
