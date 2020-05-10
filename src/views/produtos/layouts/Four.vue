<template>
  <b-card
    :key="produto.id"
    :title="produto.nome"

    tag="article"
    class="p-0 shadow product"
    body-class="p-3"
  >
    <!--:img-src="'/img/produtos/' + produto.imagem"
    img-top
    < !-- https://image.shutterstock.com/image-photo/dieting-260nw-113112424.jpg -->
    <template v-slot:header>
      <div class="product__imagem jumbotron mb-0"
           :style="{'background-image': `url('/img/produtos/${produto.imagem}')`}">
        <span v-if="produto.imagem"/>
        <span v-else class="b-avatar rounded w-100 m-auto">
        <span class="b-avatar-custom">
          <i class="fas fa-camera-retro fa-2x"/>
        </span>
      </span>
      </div>
    </template>
    <b-card-text class="flex-fill">
      <div class="w-100 d-flex justify-content-between align-items-end">
        <span class="product__preco">{{ produto.preco | formatMoney }}</span>
        <small class="ml-3"> {{ produto.unidade_medida ? ` ${produto.minimo_unidade} ${produto.unidade_medida}` : null
          }}</small>
      </div>
    </b-card-text>
    <router-link :to="{ name: 'produto.show', params: { id: produto.id } }" class="btn product__button">
      Pedir
    </router-link>
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
    }
  }
</script>

<style lang="scss" scoped>
  .jumbotron {
    //background-image: url('/img/produtos/1-7.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 10rem;
    background-position: center center;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;

    @media (max-width: 576px) {
      height: 15rem;
    }
  }

  .product {
    @media (max-width: 576px) {
      margin-left: 1.5rem !important;
      margin-right: 1.5rem !important;
    }

    /deep/ .card-header {
      padding: 0px !important;
    }

    /deep/ .card-body {
      display: flex !important;
      flex-direction: column !important;

      .card-title {
        margin: 0.25rem !important;
      }
    }

    &__ {
      &preco {
        white-space: nowrap !important;
      }

      &button {
        white-space: nowrap !important;
      }
    }
  }
</style>
