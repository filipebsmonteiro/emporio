<template>
  <b-overlay :show="isLoading">
    <SelectComponent
      :model="local_model"
      :options="ingredientes"
      :disabled="disabled"
      :searching="isLoading"
      @search="autocomplete"
      @input="evt => $emit('input', evt)">
      <template v-slot:no-results>
        Nenhum resultado para:<br/>
        "{{stringSearch}}"<br/>
        Deseja Incluir?<br/>
        <b-button variant="success" size="sm" class="ml-2" @click="addNew" pill>
          Sim
        </b-button>
      </template>
    </SelectComponent>
  </b-overlay>
</template>

<script>
  import SelectComponent from '@/components/Select/SelectComponent'
  import { mapActions, mapGetters } from 'vuex'
  import IngredienteRepository from '@/services/Ingrediente'

  export default {
    name: 'SelectIngrediente',
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
        store_ingredientes: 'ingrediente/getAll',
      }),
      ingredientes () {
        if (this.store_ingredientes && Array.isArray(this.store_ingredientes)) {
          return this.store_ingredientes.map(ent => {
            return {
              label: ent.nome,
              value: ent.id
            }
          })
        }
        return []
      },
    },
    /*watch: {
      model(newVal, oldVal) {
        this.local_model = newVal
        alert(oldVal)
      }
    },*/
    beforeUpdate(){
      this.local_model = this.model
    },
    data () {
      return {
        stringSearch: '',
        local_model: null
      }
    },
    mounted () {
      this.local_model = this.model
      this['ingrediente/listAll']()
    },
    methods: {
      ...mapActions([
        'ingrediente/listAll',
      ]),
      async autocomplete (string) {
        this.stringSearch = string
        if (string.length >= 3) {
          await this['ingrediente/listAll']([['nome', 'LIKE', '%' + string + '%']])
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
    }
  }
</script>

<style lang="scss" scoped>
</style>
