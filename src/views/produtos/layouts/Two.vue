<template>
  <b-card
    class="overflow-hidden product shadow"
    no-body
  >
    <b-row no-gutters>
      <b-col md="6" class="product__image">
        <b-card-img src="https://image.shutterstock.com/image-photo/dieting-260nw-113112424.jpg" class="rounded-0"/>
      </b-col>
      <b-col md="6">
        <b-card-body title="Horizontal Card">
          <b-card-text>
            {{ produto.ingredientes }}
          </b-card-text>

          <b-button @click="$emit('addToCart', produto)" variant="primary">
            Adicionar ao Carrinho
          </b-button>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    name: 'Two',
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
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .product {
    max-width: 540px;

    &__ {
      &image {
        margin-top: auto;
        margin-bottom: auto;
      }
    }
  }
</style>
