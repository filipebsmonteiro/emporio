<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <Categorias v-if="this.$route.name !== 'produtos.categoria'"
                    class="sticky-top"
                    @clickCategoria="loadProducts"
                    flex-column
        />
      </div>
      <div class="col-md-9">
        <b-overlay :show="isLoadingProduto">
          <ListProducts :produtosPorLinha="layout" :produtos="produtos"/>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ListProducts from '@/views/produtos/layouts/ListProducts'
  import Categorias from '@/views/produtos/Categorias'

  export default {
    name: 'IndexSideBar',
    components: { Categorias, ListProducts },
    props: {
      layout: {
        type: Number,
        default: 4
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
  .sticky-top{
    top: 1rem;
  }
</style>
