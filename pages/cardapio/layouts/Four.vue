<template>
  <div>
    <b-card-group
      v-for="(linha, linhaIndex) in chunk(produtos)"
      :key="linhaIndex"
      class="mt-4"
      deck
    >
      <b-card
        v-for="produto in linha"
        :key="produto.id"
        :title="produto.data.nome"
        img-src="~/assets/image/25-600x300.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="p-0"
      >
        <b-card-text>
          {{ produto.ingredientes }}
        </b-card-text>

        <b-button @click="$emit('addToCart', produto)" variant="primary">
          Adicionar ao Carrinho
        </b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Four',
  props: {
    produtos: {
      type: Array,
      default: () => []
    },
    productsPerLine: {
      type: Number,
      default: 4
    }
  },
  methods: {
    chunk (arr) {
      const chunks = []
      let i = 0
      const n = arr.length

      while (i < n) {
        chunks.push(arr.slice(i, i += this.productsPerLine))
      }

      return chunks
    }
  }
}
</script>

<style lang="scss" scoped>
 /deep/.card-body{
   display: flex;
   flex-direction: column;
   .card-title{
     align-content: flex-start;
   }
   .card-text{
     flex: 1;
   }
 }
</style>
