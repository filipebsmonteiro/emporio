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
          @click="listProdutos(categoria.id)">
          {{ categoria.nome }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <Two v-if="layout === 'Two'" :produtos="produtos" />
    <Four v-if="layout === 'Four'" :produtos="produtos" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Two from './layouts/Two'
import Four from './layouts/Four'

export default {
  layout: 'default',
  name: 'Index',
  components: {
    Two,
    Four
  },
  props: {
    layout: {
      type: String,
      default: 'Four'
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
      produtos: 'cardapio/getProdutos'
    })
  },
  async mounted () {
    await this['cardapio/listCategorias']()
    this.listProdutos(this.categorias[0].id)
    this.categorias.map((categoria) => {
      const grupo = categoria.grupo ? categoria.grupo : ''
      if (typeof this.categoriasAgrupadas[grupo] !== 'undefined') {
        this.categoriasAgrupadas[grupo].push(categoria)
        return
      }
      this.categoriasAgrupadas[grupo] = [categoria]
    })
    console.log(this.categoriasAgrupadas)
  },
  methods: {
    ...mapActions([
      'cardapio/listCategorias',
      'cardapio/listProdutos'
    ]),
    listProdutos (idCategoria) {
      this['cardapio/listProdutos'](idCategoria)
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
