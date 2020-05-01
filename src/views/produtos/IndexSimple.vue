<template>
  <div class="container">
    <Categorias v-if="this.$route.name !== 'produtos.categoria'"
                class="sticky-top" @clickCategoria="loadProducts"/>
    <b-overlay :show="isLoadingProduto">
      <ListProducts :produtosPorLinha="layout" :produtos="produtos"/>
    </b-overlay>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ListProducts from '@/views/produtos/layouts/ListProducts'
  import Categorias from '@/views/produtos/Categorias'

  export default {
    name: 'IndexSimple',
    components: { Categorias, ListProducts },
    props: {
      layout: {
        type: Number,
        default: parseInt(process.env.VUE_APP_LAYOUT_PRODUTOS)
      }
    },
    computed: {
      ...mapGetters({
        produtos: 'produto/getAll',
        isLoadingProduto: 'produto/isLoading',
      }),
    },
    methods: {
      ...mapActions([
        'produto/listAll'
      ]),
      async loadProducts (id) {
        await this['produto/listAll']([['Cat_produtos_idCat_produtos', '=', id]])
      }
    },
    async mounted () {
      if (this.$route.name === 'produtos.categoria'){
        await this.loadProducts(this.$route.params.id)
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
