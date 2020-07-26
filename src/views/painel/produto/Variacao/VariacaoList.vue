<template>
  <div class="row">
    <div v-for="(variacao, index) in list" :key="index" class="col-md-6 mt-3">
      <Variacao :variacao="variacao"
                @update="evt => $emit('update', {index, ...evt})"
                @remove="$emit('remove', index)"/>
    </div>
    <div class="col-md-6 mt-3">
      <button type="button" class="btn btn-block btn-info" @click="$emit('add', variacao_exemplo)">
        Adicionar Variaçao
      </button>
    </div>
  </div>
</template>

<script>
  import Variacao from '@/views/painel/produto/Variacao'

  export default {
    name: 'VariacaoList',
    components: { Variacao },
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
          ingredientes: []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
