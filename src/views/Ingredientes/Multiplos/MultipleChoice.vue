<template>
  <div class="justify-content-between">
    <h3>{{ `Escolha de ${multiplo.quantidade_min} a ${multiplo.quantidade_max} ${multiplo.nome}` }}</h3>
    <b-form-group v-for="(ingrediente, i) in ingredientes_local"
                  :key="i"
                  label-cols-lg="8"
                  label-size="lg"
                  label-class="align-self-center pb-1">
      <template v-slot:label>
        <div class="d-flex justify-content-between">
          <span>{{ ingrediente.nome }}</span>
          <span>{{ ingrediente.preco ? ingrediente.preco : null | formatMoney }}</span>
        </div>
      </template>
      <b-form-spinbutton :value="0" :min="0"
        :disabled="maxSelectReach && ingrediente.quantidade === 0"
        v-model="ingrediente.quantidade"
        :max="(maxSelectReach && ingrediente.quantidade > 0) ? ingrediente.quantidade : multiplo.quantidade_max"
        @change="updateIngrediente(ingrediente)"
      />
    </b-form-group>
  </div>
</template>

<script>
  export default {
    name: 'MultipleChoice',
    props: {
      multiplo: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      maxSelectReach() {
        let soma = 0
        this.ingredientes_local.map(i => soma += i.quantidade)

        if (soma >= this.multiplo.quantidade_max) return true

        return false
      }
    },
    data() {
      return {
        ingredientes_local: []
      }
    },
    methods:{
      getSubIngPreco(ingrediente) {
        // Valida se aquele ingrediente tem Preço naquele Multiplo
        if (ingrediente.nesseMultiplo && ingrediente.nesseMultiplo > 0){
          return ingrediente.nesseMultiplo
        }
        // Valida se aquele ingrediente tem valor Padrão
        if (ingrediente.preco > 0) {
          return ingrediente.preco > 0
        }
        return 0
      },
      updateIngrediente(ingrediente) {
        this.$emit('change', {
          multiplo: this.multiplo.id,
          ingrediente: ingrediente.id,
          quantidade: ingrediente.quantidade
        })
      }
    },
    mounted() {
      this.multiplo.ingredientes.map(i => {
        this.ingredientes_local = [
          ...this.ingredientes_local,
          {
            id: i.id,
            nome: i.nome,
            preco: i.preco,
            quantidade: 0
          }
        ]
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
