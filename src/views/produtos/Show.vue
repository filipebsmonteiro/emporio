<template>
  <div class="container mt-5">
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

        <div v-for="(multiplo, i) in produto.multiplos" :key="i">
          <MultipleChoice v-if="multiplo.isMultipleChoice" :multiplo="multiplo" @change="updateMultiplos"/>
          <SimpleChoice v-else :multiplo="multiplo" @change="updateMultiplos"/>
        </div>

        <base-button type="success" @click="adicionarCarrinho" block>Adicionar ao carrinho</base-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import MultipleChoice from '@/views/Ingredientes/Multiplos/MultipleChoice'
  import SimpleChoice from '@/views/Ingredientes/Multiplos/SimpleChoice'
  import moment from 'moment'

  export default {
    name: 'Show',
    components: { SimpleChoice, MultipleChoice },
    computed: {
      ...mapGetters({
        categorias: 'produto/categoria/getAll',
        isLoadingCategoria: 'produto/categoria/isLoading',
        store_produto: 'produto/getCurrent',
        isLoadingProduto: 'produto/isLoading'
      }),
      produto () {
        return {
          ...this.store_produto,
          unidade_medida: this.store_produto.unidade_medida ? this.store_produto.unidade_medida : null,
          intervalo: this.store_produto.intervalo ? this.store_produto.intervalo : 1,
          minimo_unidade: this.store_produto.minimo_unidade ? this.store_produto.minimo_unidade : 1,
          preco: this.store_produto.promocionar ? this.store_produto.valorPromocao : this.store_produto.preco
        }
      },
    },
    data () {
      return {
        quantidade: 1,
        multiplos: []
      }
    },
    methods: {
      ...mapActions([
        'produto/categoria/listAll',
        'produto/listOne',
        'mainbar/setQuantidade'
      ]),
      quantidadeFormatter (value) {
        if (this.produto.unidade_medida) {
          return `${value} ${this.produto.unidade_medida}`
        }
        return value
      },
      updateMultiplos (multiplo) {
        const exists = this.multiplos.find(m => m.multiplo === multiplo.multiplo && m.ingrediente === multiplo.ingrediente)
        if (exists) {
          if (multiplo.quantidade === 0) {
            this.multiplos = this.multiplos.filter(m => m.multiplo !== multiplo.multiplo && m.ingrediente !== multiplo.ingrediente)
            return
          }
          this.multiplos.map(m => {
            if (m.multiplo === multiplo.multiplo && m.ingrediente === multiplo.ingrediente) {
              m.quantidade = multiplo.quantidade
            }
          })
          return
        }

        this.multiplos = [...this.multiplos, multiplo]
      },
      adicionarCarrinho () {
        let isValid = true
        if (this.produto.multiplos) {
          this.produto.multiplos.map(multBackEnd => {
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

        if (!isValid) {
          return
        }

        const produto = {
          time: moment().format(),
          produto: this.produto.id,
          quantidade: this.quantidade,
          multiplos: this.multiplos
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
          title: `Produto adicionado ao Carrinho com Sucesso`,
          text: 'Deseja continuar comprando?',
          footer: '<a href=/pedido/carrinho>Ir para o carrinho</a>',
          focusConfirm: false,
          confirmButtonText: 'Continuar!',
        }).then(result => {
          if (result.value) {
            this.$router.push({ name: 'produtos' })
          }
        })
      }
    },
    async mounted () {
      await this['produto/listOne'](this.$route.params.id)
      this.quantidade = this.produto.minimo_unidade

      window.scrollTo(0,0)

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
