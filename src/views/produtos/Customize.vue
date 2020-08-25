<template>
  <b-card class="m-auto border-0">
    <template v-if="showName" v-slot:header>
      <div class="d-flex justify-content-between ml-3 mr-3">
        <h2 class="mb-0">{{ produto.nome }}</h2>
        <span></span>
      </div>
    </template>
    <b-card-body class="p-0">
      <CombinacaoLayoutCombo
        v-if="produto.categoria && produto.categoria.layout === 'Combo'"
        :multiplos="produto.combinacoes"
        :list="combinacoes"
        @loadCombinacoes="evt => loadProducts([
          'JOIN', 'prod_multiplo_produtos',
          'prod_multiplo_produtos.Produtos_idProdutos', '=', 'produtos.id',
          'inner', 'prod_multiplo_produtos.Prod_Multiplos_idProd_Multiplos = '+evt
        ])"
        @change="updateCombinacoes"
      />

      <CombinacaoLayoutPizza
        v-if="produto.categoria && produto.categoria.permiteCombinacao"
        :list="combinacoes"
        :quantidade-max="parseInt(produto.categoria.quantidadeCombinacoes)"
        @loadCombinacoes="loadProducts(['Cat_produtos_idCat_produtos', '=', produto.categoria.id])"
        @change="updateCombinacoes"
      />

      <IngredienteMultiploList :list="multiplos_mixed" @change="updateMultiplos"/>

      <slot name="after-customize"/>
    </b-card-body>
  </b-card>
</template>

<script>
import {mapActions} from 'vuex'
import CombinacaoLayoutCombo from '@/views/produtos/Combinacao/CombinacaoLayoutCombo'
import CombinacaoLayoutPizza from '@/views/produtos/Combinacao/CombinacaoLayoutPizza'
import IngredienteMultiploList from '@/views/Ingredientes/Multiplos/IngredienteMultiploList'

export default {
  name: 'Customize',
  components: { CombinacaoLayoutCombo,  CombinacaoLayoutPizza, IngredienteMultiploList },
  props: {
    produto: {
      type: Object,
      default: () => {
      }
    },
    showName: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    multiplos_mixed () {
      if (this.produto && this.produto.categoria){
        return [...this.produto.categoria.multiplos, ...this.produto.multiplos]
      }
      return []
    }
  },
  data () {
    return {
      multiplos: [],
      combinacoes: []
    }
  },
  methods: {
    ...mapActions([
        'produto/listAll'
    ]),
    updateCombinacoes(combinacoes){
      this.combinacoes = combinacoes
      this.$emit('changeCombinacoes', this.combinacoes)
    },
    updateMultiplos(multiplos){
      this.multiplos = multiplos
      this.$emit('changeMultiplos', this.multiplos)
    },
    async loadProducts (filters=null) {
      await this['produto/listAll']({
        filters: [
          ['status', '=', 'Disponível'],
          filters
        ]
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
