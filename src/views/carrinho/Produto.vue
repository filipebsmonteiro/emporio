<template>
  <b-table :items="produtosComputed" :fields="fields" tbody-tr-class="p-2" striped borderless responsive>
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
          :min="linha.item.minimo_unidade"
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
    <template v-slot:row-details="linha">
      <b-card class="shadow" no-body>
        <detalhes-produto :produto="linha.item" />
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
  import DetalhesProduto from '@/views/carrinho/DetalhesProduto'

  export default {
    name: 'Produto',
    components: { DetalhesProduto },
    props: {
      produtos: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      produtosComputed () {
        if (this.produtos && Array.isArray(this.produtos)) {
          // TODO: Mapear produtos do carrinho com produtos Do Banco
          return this.produtos.map(produto => {
            const intervalo = produto.intervalo ? produto.intervalo: 1
            const minimo_unidade = produto.minimo_unidade ? produto.minimo_unidade : 1
            const quantidade = produto.quantidade ? produto.quantidade : minimo_unidade
            return {
              ...produto,
              intervalo,
              minimo_unidade,
              quantidade
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
