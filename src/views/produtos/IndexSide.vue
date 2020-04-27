<template>
  <div>
    <div id="navbar-categorias" class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <base-nav
            v-if="this.$route.name !== 'produtos.categoria'"
            class="navbar-top rounded mt-3 sticky-top" flex-column expand>
            <ul class="navbar-nav mr-auto" v-for="grupo in Object.keys(categoriasAgrupadas)" :key="grupo">
              <li class="nav-item dropdown">
                <base-dropdown class="nav-link">
                  <template slot="title">{{ grupo }}</template>
                  <template>
                    <b-button variant="link" v-for="categoria in categoriasAgrupadas[grupo]" :key="categoria.id" class="dropdown-item">
                  <span @click="loadProducts(categoria.id)">
                    {{ categoria.nome }}
                  </span>
                    </b-button>
                  </template>
                </base-dropdown>
              </li>
            </ul>
          </base-nav>
        </div>
        <div class="col-md-9">
          <b-overlay :show="isLoadingProduto">
            <ListProducts :produtosPorLinha="layout" :produtos="produtos"/>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ListProducts from '@/views/produtos/layouts/ListProducts'

  export default {
    name: 'Index',
    components: { ListProducts },
    props: {
      layout: {
        type: Number,
        default: 2
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
      // eslint-disable-next-line no-console
      let categoria_id = this.$route.params.id
      if (this.$route.name !== 'produtos.categoria'){
        await this['produto/categoria/listAll']()
        categoria_id = this.categorias[0].id
      }
      await this.loadProducts(categoria_id)
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
  .sticky-top{
    top: 1rem;
  }
</style>
