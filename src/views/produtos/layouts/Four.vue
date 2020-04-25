<template>
  <b-card
    :key="produto.id"
    :title="produto.nome"
    img-src="https://image.shutterstock.com/image-photo/dieting-260nw-113112424.jpg"
    :img-alt="produto.nome"
    img-top
    tag="article"
    class="p-0 col-auto shadow"
  >
    <template v-if="!produto.imagem" v-slot:header>
      <span class="b-avatar rounded">
        <span class="b-avatar-custom">
          <i class="fas fa-camera-retro fa-2x m-auto"/>
        </span>
      </span>
    </template>
    <b-card-text>
      {{ produto.ingredientes }}
    </b-card-text>

    <b-button @click="$emit('addToCart', produto)" variant="primary">
      Adicionar ao Carrinho
    </b-button>
  </b-card>
</template>

<script>
  export default {
    name: 'Four',
    props: {
      produto: {
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
