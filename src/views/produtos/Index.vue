<template>
  <div>
    <SiteNavbar/>
    <div class="container">
      <base-nav id="navbar-main" class="navbar-top navbar-dark bg-gradient-gray-dark rounded" expand>
        <ul class="navbar-nav align-items-center" v-for="grupo in Object.keys(categoriasAgrupadas)" :key="grupo">
          <li class="nav-item dropdown">
            <base-dropdown class="nav-link">
              <template slot="title">{{ grupo }}</template>
              <template>
                <div v-for="categoria in categoriasAgrupadas[grupo]" :key="categoria.id" class="dropdown-item">
                  <span @click="loadProducts(categoria.id)">
                    {{ categoria.nome }}
                  </span>
                </div>
              </template>
            </base-dropdown>
          </li>
        </ul>
      </base-nav>
      <b-overlay :show="isLoadingProduto">
        <ListProducts :produtosPorLinha="layout" :produtos="produtos"/>
      </b-overlay>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ListProducts from '@/views/produtos/layouts/ListProducts'
  import SiteNavbar from '@/layout/SiteNavbar'

  export default {
    name: 'Index',
    components: {
      SiteNavbar,
      ListProducts
    },
    props: {
      layout: {
        type: Number,
        default: 4
      }
    },
    computed: {
      ...mapGetters({
        categorias: 'produto/categoria/getAll',
        produtos: 'produto/getAll',
        isLoadingProduto: 'produto/isLoading',
        isLoadingCategoria: 'produto/categoria/isLoading'
      }),
      categoriasAgrupadas() {
        if (this.categorias && Array.isArray(this.categorias)) {
          let Agrupadas = {}
          this.categorias.map(categoria => {
            const grupo = categoria.grupo ? categoria.grupo : ''
            if (typeof Agrupadas[grupo] !== 'undefined') {
              Agrupadas[grupo].push(categoria)
              return
            }
            Agrupadas[grupo] = [categoria]
          })
          return Agrupadas
        }
        return []
      }
    },
    async mounted () {
      await this['produto/categoria/listAll']()
      await this.loadProducts(this.categorias[0].id)
    },
    methods: {
      ...mapActions([
        'produto/categoria/listAll',
        'produto/listAll'
      ]),
      async loadProducts (id) {
        await this['produto/listAll']([['Cat_produtos_idCat_produtos', '=', id]])
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* .categorias{
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
  } */
</style>
