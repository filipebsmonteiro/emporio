<template>
  <b-overlay :show="isLoading" class="w-100">
    <base-nav
      id="navbar-categorias"
      :class="{'navbar-top': true, 'sticky-top': flexColumn }"
      :flex-column="flexColumn"
      expand>
      <ul class="navbar-nav w-100 d-flex justify-content-around">

        <li v-for="grupo in Object.keys(categoriasAgrupadas).filter(c => c !== '')" :key="grupo" class="nav-item">
          <base-dropdown tag="button" class="btn btn-link nav-link">
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

        <li v-for="categoria in categoriasAgrupadas['']" :key="categoria.id" class="nav-item">
          <b-button variant="link" class="nav-link">
              <span @click="loadProducts(categoria.id)">
                {{ categoria.nome }}
              </span>
          </b-button>
        </li>

      </ul>
    </base-nav>
  </b-overlay>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Categorias',
    props: {
      flexColumn: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters({
        categorias: 'produto/categoria/all',
        isLoading: 'produto/categoria/isLoading'
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
    methods: {
      ...mapActions([
        'produto/categoria/listAvailable',
      ]),
      loadProducts(id) {
        this.$emit('clickCategoria', id)
      }
    },
    async mounted() {
      await this['produto/categoria/listAvailable']()

      if (this.$route.name === 'produtos.categoria') {
        this.loadProducts(this.$route.params.id)
        return
      }
      this.loadProducts(this.categorias[0].id)
    }
  }
</script>

<style lang="scss" scoped>
.btn{will-change: inherit;}
</style>
