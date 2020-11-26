<template>
  <div>
    <div v-for="(produtoMultiplo, k) in multiplos" :key="k">
      <div v-if="list.find(subProd => subProd.multiplo_id === produtoMultiplo.id)"
           class="btn btn-white btn-block border-light mt-3">{{
          list.find(subProd => subProd.multiplo_id === produtoMultiplo.id).nome
        }}
        <i class="fas fa-times p-1 text-danger position-absolute t-0 r-2" @click="removeSubProd(produtoMultiplo.id)"/>
      </div>
      <b-button v-else
                variant="white border-light mt-3"
                @click="prod_multiplo_id = produtoMultiplo.id; prod_multiplo_name = produtoMultiplo.nome"
                v-b-modal.modal-combinacoes-combo block>
        {{ `Escolha ${produtoMultiplo.nome}` }}
      </b-button>
    </div>

    <b-modal id="modal-combinacoes-combo"
             size="xl"
             @shown="$emit('loadCombinacoes', prod_multiplo_id)"
             @hidden="prod_multiplo_id = null; prod_multiplo_name = null; isCostumizingSubProd = false;"
             no-close-on-backdrop
             hide-footer>
      <template slot="modal-title">
        <h1 class="modal-title">Escolha {{ prod_multiplo_name }}</h1>
      </template>
      <div v-if="isCostumizingSubProd">
        <Customize :produto="SubProd"
                   @changeCombinacoes="evt => {SubProdCombinacoes = evt}"
                   @changeMultiplos="evt => {SubProdIngMultiplos = evt}"
                   show-name>
          <template slot="after-customize">
            <base-button type="success" @click="selectSubProd" block>Selecionar</base-button>
          </template>
        </Customize>
      </div>
      <div v-else>
        <ListProducts :produtos="produtos" @select="customizeSubProd"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListProducts from '@/views/site/cardapio/layouts/ListProducts'


export default {
  name: 'CombinacaoLayoutCombo',
  components: {
    /*
    Importado dessa forma pois pode ser Importado como sub-componente
     */
    Customize: () => import('@/views/site/cardapio/Customize'),
    ListProducts
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    multiplos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      produtos: 'produto/all'
    })
  },
  data () {
    return {
      prod_multiplo_id: null,
      prod_multiplo_name: null,
      isCostumizingSubProd: false,
      SubProd: {},
      SubProdCombinacoes: [],
      SubProdIngMultiplos: [],
    }
  },
  beforeCreate: function () {
    this.$options.components.TreeFolderContents = require('@/views/site/cardapio/Customize').default
  },
  methods: {
    customizeSubProd (produto) {
      this.SubProd = produto
      const multiplos = [...produto.multiplos, ...produto.categoria.multiplos]
      if (multiplos.length > 0) {
        this.isCostumizingSubProd = true
        return
      }
      this.selectSubProd()
      this.SubProd = {}
      this.SubProdCombinacoes = []
      this.SubProdIngMultiplos = []
    },
    isValid () {
      let isValid = true
      const multiplos = [...this.SubProd.categoria.multiplos, ...this.SubProd.multiplos]
      if (multiplos) {
        multiplos.map(multBackEnd => {
          if (multBackEnd.obrigatorio) {
            let soma = 0
            this.SubProdIngMultiplos.map(multSelected => {
              soma = multSelected.multiplo === multBackEnd.id ? soma + multSelected.quantidade : soma
            })

            if (soma < multBackEnd.quantidade_min) {
              isValid = false
              this.$notify({
                type: 'danger',
                title: `Selecione ao menos ${multBackEnd.quantidade_min} ${multBackEnd.nome}`,
                verticalAlign: 'bottom',
                horizontalAlign: 'center'
              })
            }
          }
        })
      }
      return isValid
    },
    selectSubProd () {
      if (!this.isValid()) {
        return
      }
      const sub_produto = {
        id: this.SubProd.id,
        nome: this.SubProd.nome,
        multiplo_id: this.prod_multiplo_id,
        multiplos: this.SubProdIngMultiplos,
        combinacoes: this.SubProdCombinacoes
      }
      this.$bvModal.hide('modal-combinacoes-combo')
      this.$emit('change', [...this.list, sub_produto])
      this.isCostumizingSubProd = false
      this.SubProd = {}
      this.SubProdCombinacoes = []
      this.SubProdIngMultiplos = []
    },
    removeSubProd (prodMult) {
      const list = this.list.filter(subProd => subProd.multiplo_id === prodMult.id)
      this.$emit('change', list)
    }
  },
}
</script>

<style lang="scss" scoped>
.w-50 {
  width: calc(50% - 1rem) !important;
}

.t-0 {
  top: 0 !important;
}

.r-2 {
  right: 2px !important;
}

/deep/ .product {
  border-color: #adb5bd !important;
}
</style>
