<template>
  <b-overlay :show="isLoading">
    <SelectComponent
      :model="local_model"
      :options="produtos"
      :disabled="disabled"
      :searching="isLoading"
      @search="autocomplete"
      @input="inputMethod"
      label="nome"
      :reduce="option => option.id">
      <template v-slot:no-results>
        Nenhum resultado para:<br/>
        "{{stringSearch}}"<br/>
        Deseja Incluir?<br/>
        <b-button variant="success" size="sm" class="ml-2" @click="addNew" pill>Sim</b-button>
      </template>
    </SelectComponent>
  </b-overlay>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import SelectComponent from '@/components/Select/SelectComponent'
  import ProdutoRepository from '@/repositories/Produto/Produto'

  export default {
    name: 'SelectProdutos',
    components: { SelectComponent },
    props: {
      model: {
        type: Object,
        default: () => {}
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapGetters({
        isLoading: 'produto/isLoading',
        produtos: 'produto/all',
      }),
    },
    data () {
      return {
        stringSearch: '',
        local_model: null
      }
    },
    methods: {
      ...mapActions([
        'produto/listAllPaginated',
      ]),
      async autocomplete (string) {
        this.stringSearch = string
        if (string.length >= 3) {
          if (this.timer) { clearTimeout(this.timer); this.timer = null;}

          this.timer = await setTimeout(async () => {
            await this['produto/listAllPaginated']([['nome', 'LIKE', '%' + string + '%']])
          }, 900) // delay 900 milsec
        }
      },
      async addNew () {
        ProdutoRepository.post({
          nome: this.stringSearch,
          status: true,
          preco: 0,
        }).then(() => {
          this.$notify({
            type: 'success',
            title: `Produto criado com Sucesso!`
          })
          this.autocomplete(this.stringSearch)
        }).catch(() => {
          this.$notify({
            type: 'danger',
            title: `Erro ao inserir Produto!`
          })
        })
      },
      inputMethod(id) {
        const produto = this.produtos.find(i => i.id===id)
        this.$emit('input', produto)
      }
    },
    mounted () {
      this.local_model = this.model
      this['produto/listAllPaginated']()
    },
    beforeUpdate(){
      this.local_model = this.model
    }
  }
</script>

<style lang="scss" scoped>
</style>
