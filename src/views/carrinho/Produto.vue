<template>
  <b-table :items="produtos" :fields="fields" tbody-tr-class="p-2" striped borderless responsive>
    <template v-slot:cell(imagem)="linha">
      <span class="b-avatar rounded size-5">
        <span class="b-avatar-custom">
          <img v-if="linha.item.imagem" :src="linha.item.imagem" />
          <i v-else class="fas fa-camera-retro fa-2x m-auto"/>
        </span>
      </span>
    </template>
    <template v-slot:cell(quantidade)="linha">
      <b-input-group class="w-auto m-0">
        <b-input
          type="number"
          :min="linha.item.minimo_unidade || 1"
          :step="linha.item.intervalo"
          v-model="linha.item.quantidade"
        />
        <template v-if="linha.item.unidade_medida" v-slot:append>
          <b-input-group-text>
            <strong>{{ linha.item.unidade_medida }}</strong>
          </b-input-group-text>
        </template>
      </b-input-group>

    </template>
    <template v-slot:cell(detalhes)="linha">
      <base-button type="link" @click="linha.toggleDetails"><u>Detalhes</u></base-button>
    </template>
    <template v-slot:row-details="row">
      <b-card class="shadow" no-body>
        <detalhes-produto />
      </b-card>
    </template>
    <template v-slot:cell(preco)="linha">
      {{ /* TODO: Valor promocional e multiplicar pela quantidade */ }}
      {{ (linha.item.quantidade * linha.item.preco) | formatMoney }}
    </template>
    <template v-slot:cell(id)>
      <base-button type="danger" size="sm" icon="fas fa-trash" icon-only/>
    </template>
  </b-table>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import DetalhesProduto from '@/views/carrinho/DetalhesProduto'

  export default {
    name: 'Produto',
    components: { DetalhesProduto },
    computed: {
      ...mapGetters({
        store_produtos: 'produto/getAll'
      }),
      produtos () {
        if (this.store_produtos && Array.isArray(this.store_produtos)) {
          // TODO: Mapear produtos do carrinho com produtos Do Banco
          return this.store_produtos.map(produto => {
            return {
              ...produto,
              //unidade_medida: 'kg',
              //intervalo: '0.5',
              //minimo_unidade: '2.5',
              quantidade: 1,
              valor: produto.valor
            }
          })
        }
        return []
      }
    },
    data () {
      return {
        fields: [
          { key: 'imagem', label: '' },
          { key: 'quantidade', label: 'Quantidade' },
          { key: 'nome', label: 'Produto' },
          { key: 'categoria', label: 'Tipo' },
          { key: 'detalhes', label: 'Detalhes' },
          { key: 'preco', label: 'Valor' },
          { key: 'id', label: 'Remover' },
        ]
      }
    },
    methods: {
      ...mapActions([
        'produto/listAll'
      ])
    },
    async mounted () {
      await this['produto/listAll']()
    }
  }
</script>

<style lang="scss" scoped>
  .size-5 {
    width: 5rem;
    height: 5rem;
  }
  /deep/ th {
    &:last-child {
      text-align: center !important;
    }
  }

  /deep/ td {
    padding: 0.5rem !important;
    vertical-align: middle !important;

    &:last-child {
      text-align: center !important;
    }
  }
</style>
