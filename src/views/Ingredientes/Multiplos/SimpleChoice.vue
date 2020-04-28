<template>
  <b-form-group :label="`Selecione ${multiplo.nome}`" label-class="h3">
    <b-form-select @change="updateIngrediente">
      <b-form-select-option v-for="(ingrediente, i) in multiplo.ingredientes" :key="i" :value="ingrediente.id">
        {{ ingrediente.nome }}
        {{ getSubIngPreco(ingrediente) ? getSubIngPreco(ingrediente) : null | formatMoney }}
      </b-form-select-option>
    </b-form-select>
  </b-form-group>
</template>

<script>
  export default {
    name: 'SimpleChoice',
    props: {
      multiplo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        ingrediente_local: {}
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
        if (this.ingrediente_local.ingrediente) {
          this.$emit('change', {
            multiplo: this.multiplo.id,
            ingrediente: this.ingrediente_local.ingrediente,
            quantidade: 0
          })
        }

        this.ingrediente_local.ingrediente = ingrediente
        this.$emit('change', {
          multiplo: this.multiplo.id,
          ingrediente,
          quantidade: 1
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
