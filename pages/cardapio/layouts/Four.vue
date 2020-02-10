<template>
  <b-card
    :key="product.id"
    :title="product.data.nome"
    img-src="~/assets/image/25-600x300.jpg"
    img-alt="Image"
    img-top
    tag="article"
    class="p-0 col-auto"
  >
    <b-card-text>
      {{ product.ingredientes }}
    </b-card-text>

    <b-button @click="$emit('addToCart', product)" variant="primary">
      Adicionar ao Carrinho
    </b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Four',
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          id: 0,
          data: {
            nome: ''
          },
          ingredientes: ''
        }
      }
    }
  },
  methods: {
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
