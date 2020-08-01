<template>
  <div :class="{'container-fluid': catLayout === 'Side', 'container': catLayout === 'Top'}">
    <div :class="{'row': catLayout === 'Side'}">
      <div :class="{'col-md-3': catLayout === 'Side'}">
        <Categorias
          :class="{'position-sticky sticky-top': catLayout === 'Side'}"
          @clickCategoria="loadProducts"
          :flex-column="catLayout === 'Side'"
        />
      </div>
      <div :class="{'col-md-9': catLayout === 'Side'}">
        <b-overlay :show="isLoadingProduto" no-center>
          <template v-slot:overlay>
            <div class="d-flex mt-5">
              <div class="m-auto">
                <b-icon icon="stopwatch" font-scale="3" animation="cylon"/>
                <p>Carregando...</p>
              </div>
            </div>
          </template>
          <ListProducts
            :produtosPorLinha="layout"
            :produtos="produtos"
            @select="evt => $router.push({name: 'produto.show', params: {id: evt.id}})"
          />
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
  name: 'Index',
  components: { Categorias, ListProducts },
  props: {
    layout: {
      type: Number,
      default: parseInt(process.env.VUE_APP_LAYOUT_PRODUTOS)
    }
  },
  computed: {
    ...mapGetters({
      produtos: 'produto/all',
      isLoadingProduto: 'produto/isLoading',
    }),
    catLayout () {
      if (process.env.VUE_APP_LAYOUT_CATEGORIAS === 'Side') {
        return 'Side'
      }

      return 'Top'
    }
  },
  methods: {
    ...mapActions([
      'produto/listAll'
    ]),
    async loadProducts (id) {
      await this['produto/listAll']({
        'filters': [
          ['Cat_produtos_idCat_produtos', '=', id],
          ['status', '=', 'Disponível']
        ]
      })
    }
  },
  async mounted () {
    window.scrollTo(0, 0)
  },
}
</script>

<style lang="scss" scoped>
.sticky-top {
  top: 1rem;
}
</style>
