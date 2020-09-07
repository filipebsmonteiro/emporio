<template>
  <b-card class="overflow-hidden product shadow" no-body>
    <b-row class="flex-fill" no-gutters>
      <span v-if="produto.promocionar" class="ribbon">Promoção</span>
      <b-col md="6" class="product__image">
        <b-card-img v-if="produto.imagem"
                    :src="getImageUrl(produto.imagem)"
                    class="rounded-0"/>
        <span v-else class="b-avatar rounded ml-6">
          <span class="b-avatar-custom">
            <i class="fas fa-camera-retro fa-2x m-auto"/>
          </span>
        </span>
      </b-col>
      <b-col md="6" class="d-flex">
        <b-card-body :title="produto.nome" class="d-flex flex-column p-3">
          <b-card-text class="flex-fill">
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
                   variant="outline-success"
                   class="text-sm ml-auto pt-0 pb-0 pl-1 pr-1"
                   v-b-toggle="`ingredientes-${produto.id}`">
              <b-icon icon="plus-circle"/>
            </b-btn>
          </b-btn-group>
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
    methods: {
      getImageUrl (imageName) {
        return `${process.env.VUE_APP_DOMAIN_URL}/imagens/produtos/${imageName}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product {
    max-width: 540px;

    overflow: hidden;
    /deep/ .ribbon{
      width: 200px;
      background: linear-gradient(#2EB62C, #57C84D);
      position: absolute;
      top: 21px;
      left: -67px;
      text-align: center;
      line-height: 20px;
      font-weight: bold;
      color: #f0f0f0;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }

    &__ {
      &image {
        margin-top: auto;
        margin-bottom: auto;
      }

      &button {
        white-space: nowrap !important;
      }
    }
  }
</style>
