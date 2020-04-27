<template>
  <div class="container mt-5">
    <b-card class="shadow col-md-8 m-auto">
      <template v-slot:header>
        <div class="d-flex justify-content-between ml-3 mr-3">
          <h2 class="mb-0">{{ produto.nome }}</h2>
          <h2 class="mb-0">{{ (produto.preco / produto.minimo_unidade) * quantidade | formatMoney }}</h2>
        </div>
      </template>
      <p>{{ produto.ingredientes }}</p>
      <b-form-group :label="`Quantidade ${produto.unidade_medida || ''}`"
                    label-cols-lg="8"
                    label-size="lg"
                    label-class="pt-0"
                    class="mb-5">
        <b-form-spinbutton v-model="quantidade" :min="produto.minimo_unidade" :step="produto.intervalo" max="500"/>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Show',
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
          unidade_medida: this.unidade_medida ? this.unidade_medida : null,
          intervalo: this.store_produto.intervalo ? this.store_produto.intervalo: 1,
          minimo_unidade: this.store_produto.minimo_unidade ? this.store_produto.minimo_unidade : 1,
          preco: this.store_produto.promocionar ? this.store_produto.valorPromocao : this.store_produto.preco
        }
      }
    },
    data() {
      return {
        quantidade: 1
      }
    },
    methods: {
      ...mapActions([
        'produto/categoria/listAll',
        'produto/listOne'
      ]),
    },
    async mounted () {
        await this['produto/listOne'](this.$route.params.id)
        this.quantidade = this.produto.minimo_unidade
        // eslint-disable-next-line no-console
        console.log(this.produto)
      },
  }
</script>

<style lang="scss" scoped>
</style>
