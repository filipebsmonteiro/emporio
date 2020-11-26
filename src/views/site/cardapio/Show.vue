<template>
  <div class="container mt-5">
    <b-overlay :show="isLoadingCategoria || isLoadingProduto">
      <b-card class="shadow col-md-8 m-auto">
        <template v-slot:header>
          <div class="d-flex justify-content-between ml-3 mr-3">
            <h2 class="mb-0">{{ produto.nome }}</h2>
            <h2 class="mb-0">{{ (produto.preco / produto.minimo_unidade) * quantidade | formatMoney }}</h2>
          </div>
        </template>
        <b-card-body>
          <b-form-group label="Quantidade" label-cols-lg="8" label-size="lg" label-class="pt-0" class="mb-5">
            <b-form-spinbutton
              v-model="quantidade"
              :min="produto.minimo_unidade"
              :step="produto.intervalo"
              max="500"
              :formatter-fn="quantidadeFormatter"
            />
          </b-form-group>

          <Customize :produto="produto"
                     @changeCombinacoes="evt => {combinacoes = evt}"
                     @changeMultiplos="evt => {multiplos = evt}"
          />

          <b-button variant="success product__button" @click="adicionarCarrinho" block>Adicionar ao carrinho</b-button>
        </b-card-body>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Customize from '@/views/site/cardapio/Customize'

export default {
  name: 'Show',
  components: { Customize },
  computed: {
    ...mapGetters({
      isLoadingCategoria: 'produto/categoria/isLoading',
      store_produto: 'produto/current',
      isLoadingProduto: 'produto/isLoading'
    }),
    produto () {
      return {
        ...this.store_produto,
        unidade_medida: this.store_produto.unidade_medida ? this.store_produto.unidade_medida : null,
        intervalo: this.store_produto.intervalo ? this.store_produto.intervalo : 1,
        minimo_unidade: this.store_produto.minimo_unidade ? this.store_produto.minimo_unidade : 1,
        preco: this.store_produto.promocionar ? this.store_produto.valorPromocao : this.store_produto.preco,
      }
    }
  },
  data () {
    return {
      quantidade: 1,
      multiplos: [],
      combinacoes: []
    }
  },
  methods: {
    ...mapActions([
      'produto/listOne',
      'mainbar/setQuantidade',
      'produto/listAll'
    ]),
    quantidadeFormatter (value) {
      if (this.produto.unidade_medida) {
        return `${value} ${this.produto.unidade_medida}`
      }
      return value
    },
    isValid() {
      let isValid = true
      const multiplos = [...this.produto.categoria.multiplos, ...this.produto.multiplos]
      if (multiplos) {
        multiplos.map(multBackEnd => {
          if (multBackEnd.obrigatorio) {
            let soma = 0
            this.multiplos.map(multSelected => {
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

      if (this.produto.combinacoes > this.combinacoes) {
        isValid = false
        this.$notify({
          type: 'danger',
          title: `Todos itens são obrigados no Combo`,
          verticalAlign: 'bottom',
          horizontalAlign: 'center'
        })
      }
      return isValid
    },
    adicionarCarrinho () {
      if (!this.isValid()) {
        return
      }

      const produto = {
        time: moment().format(),
        produto: this.produto.id,
        quantidade: this.quantidade,
        multiplos: this.multiplos,
        combinacoes: this.combinacoes
      }

      let carrinho = this.$localStorage.get('carrinho', null)
      if (carrinho) {
        const carrinhoParsed = JSON.parse(carrinho)
        carrinho = [...carrinhoParsed, produto]
      } else {
        carrinho = [produto]
      }
      this.$localStorage.set('carrinho', JSON.stringify(carrinho))

      this['mainbar/setQuantidade'](carrinho.length)

      if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED)) {
        this.$analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
          em: process.env.VUE_APP_FACEBOOK_EMAIL
        })
        this.$analytics.fbq.event('AddToCart', {
          content_ids: [`${this.produto.id}`],
          content_type: 'product',
          content_name: `${this.store_produto.nome}`,
          content_category: `${this.produto.categoria.grupo} ${this.produto.categoria.nome}`,
          currency: 'BRL',
          value: (this.produto.preco / this.produto.minimo_unidade) * produto.quantidade,
        })
      }

      this.$swal({
        icon: 'success',
        title: `Produto adicionado ao carrinho com sucesso`,
        text: 'Deseja continuar comprando?',
        footer: '<a href=/pedido/carrinho>Ir para o carrinho</a>',
        focusConfirm: false,
        confirmButtonText: 'Continuar!',
      }).then(result => {
        if (result.value) {
          this.$router.push({ name: 'produtos.categoria', params: { id: this.store_produto.categoria.id } })
        }
      })
    }
  },
  async mounted () {
    window.scrollTo(0, 0)
    await this['produto/listOne'](this.$route.params.id)
    this.quantidade = this.produto.minimo_unidade

    this.produto.combinacoes.map(c => {
      this.combinacoes[c.id] = []
    })

    if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED)) {
      this.$analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
        em: process.env.VUE_APP_FACEBOOK_EMAIL
      })
      this.$analytics.fbq.event('ViewContent', {
        content_ids: [`${this.$route.params.id}`],
        content_type: 'product',
        content_name: `${this.store_produto.nome}`,
        content_category: `${this.store_produto.categoria.grupo} ${this.store_produto.categoria.nome}`,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
