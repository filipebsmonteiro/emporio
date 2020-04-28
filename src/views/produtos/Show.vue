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
      produto() {
        return {
          ...this.store_produto,
          unidade_medida: this.store_produto.unidade_medida ? this.store_produto.unidade_medida : null,
          intervalo: this.store_produto.intervalo ? this.store_produto.intervalo : 1,
          minimo_unidade: this.store_produto.minimo_unidade ? this.store_produto.minimo_unidade : 1,
          preco: this.store_produto.promocionar ? this.store_produto.valorPromocao : this.store_produto.preco
        }
      },
    },
    data() {
      return {
        quantidade: 1,
        multiplos: []
      }
    },
    methods: {
      ...mapActions([
        'produto/categoria/listAll',
        'produto/listOne',
        'carrinho/setQuantidade'
      ]),
      quantidadeFormatter(value) {
        if (this.produto.unidade_medida) {
          return `${value} ${this.produto.unidade_medida}`
        }
        return value
      },
      updateMultiplos(multiplo) {
        // eslint-disable-next-line no-console
        console.log(multiplo)
        const exists = this.multiplos.find(m => m.multiplo === multiplo.multiplo && m.ingrediente === multiplo.ingrediente)
        if (exists) {
          if (multiplo.quantidade === 0){
            this.multiplos = this.multiplos.filter(m => m.multiplo !== multiplo.multiplo && m.ingrediente !== multiplo.ingrediente)
            return
          }
          this.multiplos.map(m => {
            if (m.multiplo === multiplo.multiplo && m.ingrediente === multiplo.ingrediente){
              m.quantidade = multiplo.quantidade
            }
          })
          return
        }

        this.multiplos = [...this.multiplos, multiplo]
      },
      adicionarCarrinho() {
        const produto = {
          produto: this.produto.id,
          quantidade: this.quantidade,
          multiplos: this.multiplos
        }

        let carrinho = this.$localStorage.get('carrinho', null)
        if (carrinho){
          const carrinhoParsed = JSON.parse(carrinho)
          carrinho = [...carrinhoParsed, produto]
        }else {
          carrinho = [produto]
        }
        this.$localStorage.set('carrinho', JSON.stringify(carrinho))

        this['carrinho/setQuantidade'](carrinho.length)

        this.$swal({
          icon: 'success',
          title: `Produto adicionado ao Carrinho com Sucesso`,
          text: 'Deseja continuar comprando?',
          footer: '<a href=/carrinho>Ir para o carrinho</a>',
          focusConfirm: false,
          confirmButtonText: 'Continuar!',
        }).then(result => {
          if (result.value) {
            this.$router.push({name: 'produtos'})
          }
        })
      }
    },
    async mounted () {
      await this['produto/listOne'](this.$route.params.id)
      this.quantidade = this.produto.minimo_unidade
    },
  }
</script>

<style lang="scss" scoped>
</style>
