<template>
  <b-form-group label="Combinações" label-size="lg" label-class="pt-0" class="mb-5">
    <div class="d-flex">
      <div v-for="(combinacao, index) in list" :key="index" class="w-50 m-1">
        <b-button v-if="combinacao.id" variant="white border-success text-green" @click="combinacao.id = 1" block>
          {{ `${selectedPrefix} ${combinacao.nome}` }}
          <i class="fas fa-times p-1 text-danger position-absolute t-0 r-2" @click="removeCombinacao(index)"/>
        </b-button>
        <b-button v-else variant="white border-light"
                  @click="actualCombinacaoIndex = index"
                  v-b-modal.modal-combinacoes-pizza block>{{ combinacaoText }}
          <i class="fas fa-times p-1 text-danger position-absolute t-0 r-2" @click="removeCombinacao(index)"/>
        </b-button>
      </div>

      {{/* Subtrai 1, pois a primeira combinação é o sabor inicial da Pizza */}}
      <b-button v-if="list.length < quantidadeMax-1" variant="white border-light w-50 m-1" @click="addCombinacao">
        <i class="fas fa-plus fa-2x"></i>
      </b-button>
      <b-modal id="modal-combinacoes-pizza" size="xl"
               @shown="$emit('loadCombinacoes')"
               @hidden="actualCombinacaoIndex = null"
               no-close-on-backdrop hide-footer>
        <template slot="modal-title">
          <h1 class="modal-title">{{ combinacaoText }}</h1>
        </template>
        <ListProducts :produtos="produtos"
                      @select="evt => {
                      updateCombinacao({index: actualCombinacaoIndex, ...evt});
                      $bvModal.hide('modal-combinacoes-pizza')
                    }"/>
      </b-modal>
    </div>
  </b-form-group>
</template>

<script>
import { mapGetters } from 'vuex'
import ListProducts from '@/views/produtos/layouts/ListProducts'

export default {
  name: 'CombinacaoLayoutPizza',
  components: { ListProducts },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    quantidadeMax: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      produtos: 'produto/all'
    }),
    combinacaoText () {
      if (this.list.length === 1) {
        return 'Selecione a outra Metade'
      }
      if (this.list.length === 2) {
        return 'Selecione a outra parte'
      }
      if (this.list.length === 3) {
        return 'Selecione a outra parte'
      }
      return ''
    },
    selectedPrefix () {
      if (this.list.length === 1) {
        return 'Metade'
      }
      if (this.list.length === 2) {
        return 'Um terço'
      }
      if (this.list.length === 3) {
        return 'Um quarto'
      }
      return ''
    }
  },
  data () {
    return {}
  },
  methods: {
    addCombinacao () {
      this.$emit('change', [...this.list, { index: this.list.length }])
    },
    updateCombinacao (combinacao) {
      const combinacoes = this.list.map((combinacaoLoop, idx) => {
        if (idx === combinacao.index) {
          return {
            index: combinacao.index,
            id: combinacao.id,
            nome: combinacao.nome,
            preco: combinacao.preco
          }
        }
        return combinacaoLoop
      })
      this.$emit('change', combinacoes)
    },
    removeCombinacao (index) {
      const combinacoes = this.list.filter((mult, idx) => {
        if (idx !== index) {
          return mult
        }
      })
      this.$emit('change', combinacoes)
    },
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
