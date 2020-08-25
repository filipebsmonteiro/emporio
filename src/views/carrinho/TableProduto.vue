<template>
  <b-table :items="produtos" :fields="fields" tbody-tr-class="p-2" striped borderless responsive>
    <template v-slot:cell(imagem)="linha">
      <span class="b-avatar rounded size-5">
        <span class="b-avatar-custom">
          <img v-if="linha.item.imagem" :src="getImageUrl(linha.item.imagem)"/>
          <i v-else class="fas fa-camera-retro fa-2x m-auto"/>
        </span>
      </span>
    </template>
    <template v-slot:cell(quantidade)="{ item }">
      <b-input-group class="w-auto m-0">
        <b-input
          type="number"
          :min="item.minimo_unidade"
          :step="item.intervalo"
          v-model="item.quantidade"
          @change="$emit('updqtd', { produto: item.produto, quantidade: item.quantidade})"
        />
        <template v-if="item.unidade_medida" v-slot:append>
          <b-input-group-text>
            <strong>{{ item.unidade_medida }}</strong>
          </b-input-group-text>
        </template>
      </b-input-group>

    </template>
    <template v-slot:cell(nome)="{ item }">
      <div v-if="item.categoria && item.categoria.layout === 'Pizza'">
        {{ `${combinacoesPrefix(item)} ${item.nome}` }}
        <span v-for="(combinacao, i) in item.combinacoes" :key="i">
          <br>{{ `${combinacoesPrefix(item)} ${combinacao.nome}` }}
        </span>
      </div>
      <div v-else>
        {{ item.nome }}
      </div>
    </template>
    <template v-slot:cell(detalhes)="{ item: {multiplos, detalhes}, toggleDetails}">
      <base-button v-if="(multiplos && multiplos.length > 0) || (detalhes && detalhes.length > 0)"
                   type="link" @click="toggleDetails">
        <u>Detalhes</u>
      </base-button>
    </template>
    <template v-slot:row-details="linha">
      <b-card class="shadow" no-body>
        <DetalhesProduto :detalhes="linha.item.detalhes"/>
      </b-card>
    </template>
    <template v-slot:cell(valor)="linha">
      {{ (linha.item.quantidade * linha.item.valor) | formatMoney }}
    </template>
    <template v-slot:cell(id)="linha">
      <base-button type="danger" size="sm" icon="fas fa-trash" @click="$emit('remove', linha.item.time)" icon-only/>
    </template>
  </b-table>
</template>

<script>
import DetalhesProduto from '@/views/carrinho/DetalhesProduto'

export default {
  name: 'TableProduto',
  components: {DetalhesProduto},
  props: {
    produtos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fields: [
        {key: 'imagem', label: ''},
        {key: 'quantidade', label: 'Quantidade'},
        {key: 'nome', label: 'Produto'},
        {key: 'categoria', label: 'Tipo'},
        {key: 'detalhes', label: 'Detalhes'},
        {key: 'valor', label: 'Valor'},
        {key: 'id', label: 'Remover'},
      ]
    }
  },
  methods: {
    getImageUrl(imageName) {
      return `${process.env.VUE_APP_DOMAIN_URL}/imagens/produtos/${imageName}`
    },
    combinacoesPrefix(produto) {
      if (produto.combinacoes.length === 1) {
        return 'Metade'
      }
      if (produto.combinacoes.length === 2) {
        return 'Um terço'
      }
      if (produto.combinacoes.length === 3) {
        return 'Um quarto'
      }
      return ''
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
