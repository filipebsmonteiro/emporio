<template>
  <div>
    <b-nav fill class="mt-1 rounded categorias">
      <b-nav-item-dropdown v-for="grupo in Object.keys(categoriasAgrupadas)" :key="grupo" right>
        <template v-slot:button-content>
          {{ grupo }}
        </template>
        <b-dropdown-item
          v-for="categoria in categoriasAgrupadas[grupo]"
          :key="categoria.id"
          @click="loadProducts(categoria.id)"
        >
          {{ categoria.nome }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>

    <ListProducts :productsPerLine="productsPerLine" :products="produtos" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListProducts from './layouts/ListProducts'

export default {
  layout: 'default',
  name: 'Index',
  components: {
    ListProducts
  },
  props: {
    layout: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      categoriasAgrupadas: {}
    }
  },
  computed: {
    ...mapGetters({
      categorias: 'cardapio/getCategorias',
      produtos: 'cardapio/getProdutos',
      productsPerLine: 'cardapio/getProdutosPerLine'
    })
  },
  async mounted () {
    await this['cardapio/listCategorias']()
    await this['cardapio/listProdutos'](this.categorias[0].id)
    this.categorias.map((categoria) => {
      const grupo = categoria.grupo ? categoria.grupo : ''
      if (typeof this.categoriasAgrupadas[grupo] !== 'undefined') {
        this.categoriasAgrupadas[grupo].push(categoria)
        return
      }
      this.categoriasAgrupadas[grupo] = [categoria]
    })
  },
  methods: {
    ...mapActions([
      'cardapio/listCategorias',
      'cardapio/listProdutos'
    ]),
    async loadProducts (id) {
      await this['cardapio/listProdutos'](id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .categorias{
    background-color: $navcat-bg-color;
    border-left: $navcat-border-left-px $navcat-border-left-type $navcat-border-color;
    border-top: $navcat-border-top-px $navcat-border-left-type $navcat-border-color;
    border-right: $navcat-border-right-px $navcat-border-right-type $navcat-border-color;
    border-bottom: $navcat-border-bottom-px $navcat-border-bottom-type $navcat-border-color;
    /deep/ li {
      &:hover{
        background-color: $navcat-bg-color-hover;
      }
      a {
        color: $navcat-text-color;
      }
    }
  }
</style>
