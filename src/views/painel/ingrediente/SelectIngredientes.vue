<template>
  <b-overlay :show="isLoading">
    <SelectComponent
      :model="local_model"
      :options="ingredientes"
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
  import SelectComponent from '@/components/Select/SelectComponent'
  import { mapActions, mapGetters } from 'vuex'
  import IngredienteRepository from '@/repositories/Ingrediente'

  export default {
    name: 'SelectIngredientes',
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
        isLoading: 'ingrediente/isLoading',
        ingredientes: 'ingrediente/all',
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
        'ingrediente/listAllPaginated',
      ]),
      async autocomplete (string) {
        this.stringSearch = string
        if (string.length >= 3) {
          if (this.timer) { clearTimeout(this.timer); this.timer = null;}

          this.timer = await setTimeout(async () => {
            await this['ingrediente/listAllPaginated']({
              filters: [['nome', 'LIKE', '%' + string + '%']],
              per_page: 10
            })
          }, 900) // delay 900 milsec
        }
      },
      async addNew () {
        IngredienteRepository.post({
          nome: this.stringSearch,
          status: true,
          preco: 0,
        }).then(() => {
          this.$notify({
            type: 'success',
            title: `Ingrediente criado com Sucesso!`
          })
          this.autocomplete(this.stringSearch)
        }).catch(() => {
          this.$notify({
            type: 'danger',
            title: `Erro ao inserir Ingrediente!`
          })
        })
      },
      inputMethod(id) {
        const ingrediente = this.ingredientes.find(i => i.id===id)
        this.$emit('input', ingrediente)
      }
    },
    mounted () {
      this.local_model = this.model
      this['ingrediente/listAllPaginated']({per_page: 10})
    },
    beforeUpdate(){
      this.local_model = this.model
    }
  }
</script>

<style lang="scss" scoped>
</style>
