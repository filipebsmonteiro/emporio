<template>
  <b-table :items="produtos" :fields="fields" tbody-tr-class="p-2" striped borderless responsive>
    <template v-if="!hideImg" v-slot:cell(imagem)="linha">
      <span class="b-avatar rounded">
        <span class="b-avatar-custom">
          <img v-if="linha.item.imagem" :src="getImageUrl(linha.item.imagem)" width="100"/>
          <i v-else class="fas fa-camera-retro fa-2x m-auto"/>
        </span>
      </span>
    </template>
    <template v-slot:cell(quantidade)="{ item }">
      {{ item.quantidade }}<strong v-if="item.unidade_medida"> {{ item.unidade_medida }}</strong>
    </template>
    <template v-slot:cell(nome)="{ item }">
      <b class="border-bottom">{{ item.nome }}</b>
      <span v-for="(combinacao, i) in item.combinacoes" :key="i">
        <br><b v-if="combinacao.produto_multiplo">{{ combinacao.produto_multiplo.nome }}: </b>{{ combinacao.nome }}
      </span>
    </template>
    <template v-slot:cell(detalhes)="linha">
      <base-button v-if="linha.item.multiplos.length > 0" type="link" @click="linha.toggleDetails">
        <u>Detalhes</u>
      </base-button>
    </template>
    <template v-slot:row-details="linha">
      <b-card class="shadow" no-body>
        <detalhes-produto :detalhes="linha.item.multiplos"/>
      </b-card>
    </template>
    <template v-slot:cell(valor)="linha">
      {{ linha.item.valor | formatMoney }}
    </template>
  </b-table>
</template>

<script>
  import DetalhesProduto from '@/views/produtos/DetalhesProduto'

  export default {
    name: 'TableProduto',
    components: { DetalhesProduto },
    props: {
      produtos: {
        type: Array,
        default: () => []
      },
      hideImg: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        fields: [
          { key: 'imagem', label: '' },
          { key: 'quantidade', label: 'Quantidade' },
          { key: 'nome', label: 'Produto' },
          { key: 'categoria', label: 'Tipo' },
          { key: 'detalhes', label: 'Detalhes' },
          { key: 'valor', label: 'Valor' },
        ]
      }
    },
    methods: {
      getImageUrl (imageName) {
        return `${process.env.VUE_APP_DOMAIN_URL}/imagens/produtos/${imageName}`
      },
      combinacoesPrefix (produto) {
        // if (produto.combinacoes.length === 1) {
        //   return 'Metade'
        // }
        // if (produto.combinacoes.length === 2) {
        //   return 'Um terço'
        // }
        // if (produto.combinacoes.length === 3) {
        //   return 'Um quarto'
        // }
        produto
        return ''
      }
    },
    mounted () {
      if (this.hideImg) {
        this.fields = this.fields.filter(f => f.key !== ' imagem')
      }
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
