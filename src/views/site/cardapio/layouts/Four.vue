<template>
  <b-card
    :key="produto.id"
    :title="produto.nome"
    class="p-0 shadow product"
    body-class="p-3"
  >
    <template v-slot:header>
      <div class="product__imagem jumbotron mb-0"
           :style="{'background-image': `url('${getImageUrl(produto.imagem)}')`}">
        <span v-if="produto.imagem"/>
        <span v-else class="b-avatar rounded w-100 m-auto">
        <span class="b-avatar-custom">
          <i class="fas fa-camera-retro fa-2x"/>
        </span>
      </span>
      </div>
    </template>
    <b-card-text class="flex-fill">
      <div v-if="produto.promocionar" class="ribbon-side"><span>Promoção</span></div>
      <div class="w-100 d-flex justify-content-between align-items-end">
        <span class="product__preco">{{ produto.preco | formatMoney }}</span>
        <small class="ml-3">
          {{ produto.unidade_medida ? ` ${produto.minimo_unidade} ${produto.unidade_medida}` : null }}
        </small>
      </div>
      <b-collapse :id="`ingredientes-${produto.id}`">{{ produto.ingredientes }}</b-collapse>
    </b-card-text>

    <b-btn-group>
      <b-button variant="success product__button" @click="$emit('select', produto)" block>Pedir</b-button>
      <b-btn v-if="produto.ingredientes"
             variant="outline-success product__detail-button"
             class="text-sm ml-auto pt-0 pb-0 pl-1 pr-1"
             v-b-toggle="`ingredientes-${produto.id}`">
        <b-icon icon="plus-circle"/>
      </b-btn>
    </b-btn-group>
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
      getImageUrl (imageName) {
        return `${process.env.VUE_APP_DOMAIN_URL}/imagens/produtos/${imageName}`
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

    /deep/ .ribbon-side {
      position: absolute;
      left: -5px;
      top: -5px;
      z-index: 1;
      overflow: hidden;
      width: 75px;
      height: 75px;
      text-align: right;
      span {
        font-size: 10px;
        font-weight: bold;
        color: #FFF;
        text-transform: uppercase;
        text-align: center;
        line-height: 20px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        width: 100px;
        display: block;
        background: #79A70A;
        background: linear-gradient(#9BC90D 0%, #79A70A 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px;
        left: -21px;
        &::before {
          content: '';
          position: absolute;
          left: 0px;
          top: 100%;
          z-index: -1;
          border-left: 3px solid #79A70A;
          border-right: 3px solid transparent;
          border-bottom: 3px solid transparent;
          border-top: 3px solid #79A70A;
        }
        &::after {
          content: '';
          position: absolute;
          right: 0%;
          top: 100%;
          z-index: -1;
          border-right: 3px solid #79A70A;
          border-left: 3px solid transparent;
          border-bottom: 3px solid transparent;
          border-top: 3px solid #79A70A;
        }
      }
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
