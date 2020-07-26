<template>
  <b-card class="overflow-hidden product shadow" no-body>
    <b-row no-gutters>
      <b-col md="6" class="product__image">
        <b-card-img v-if="produto.imagem"
                    :src="getImageUrl(produto.imagem)"
                    class="rounded-0"/>
        <span v-else class="b-avatar rounded">
          <span class="b-avatar-custom">
            <i class="fas fa-camera-retro fa-2x m-auto"/>
          </span>
        </span>
      </b-col>
      <b-col md="6" class="d-flex">
        <b-card-body :title="produto.nome" class="d-flex flex-column p-3">
          <b-card-text class="flex-fill">
            {{ produto.ingredientes }}
          </b-card-text>

          <b-button variant="success product__button" @click="$emit('select', produto)" block>Pedir</b-button>
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
