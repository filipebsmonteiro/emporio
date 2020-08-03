<template>
  <div class="row">
    <div v-for="(variacao, index) in list" :key="index" class="col-md-6 mt-3">
      <SubProdutoList :variacao="variacao"
                      @update="evt => updateVariacao({index, ...evt})"
                      @remove="removeVariacao(index)"/>
    </div>
    <div class="col-md-6 mt-3">
      <button type="button" class="btn btn-block btn-info" @click="addVariacao(variacao_exemplo)">
        Adicionar Variaçao
      </button>
    </div>
  </div>
</template>

<script>
  import SubProdutoList from '@/views/painel/produto/Variacao/SubProdutoList'

  export default {
    name: 'ProdutoMultiploList',
    components: { SubProdutoList },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        variacao_exemplo: {
          nome: null,
          quantidade_min: null,
          quantidade_max: null,
          obrigatorio: true,
          produtos: []
        }
      }
    },
    methods: {
      addVariacao (variacao) {
        const copy = Object.assign({}, variacao)
        const multiplos = [...this.list, copy]
        this.$emit('update', multiplos)
      },
      updateVariacao (variacao) {
        const multiplos = this.list.map((mult, idx) => {
          if (idx === variacao.index) {
            return variacao
          }
          return mult
        })
        this.$emit('update', multiplos)
      },
      removeVariacao (index) {
        const multiplos = this.list.filter((mult, idx) => {
          if (idx !== index) {
            return mult
          }
        })
        this.$emit('update', multiplos)
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>
