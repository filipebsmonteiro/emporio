<template>
  <div>
    <div v-for="(multiplo, i) in list" :key="i">
      <MultipleChoice v-if="multiplo.isMultipleChoice" :multiplo="multiplo" @change="updateMultiplos"/>
      <SimpleChoice v-else :multiplo="multiplo" @change="updateMultiplos"/>
    </div>
  </div>
</template>

<script>
import MultipleChoice from '@/views/Ingredientes/Multiplos/MultipleChoice'
import SimpleChoice from '@/views/Ingredientes/Multiplos/SimpleChoice'

export default {
  name: 'IngredienteMultiploList',
  components: { SimpleChoice, MultipleChoice },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      multiplos: []
    }
  },
  methods: {
    updateMultiplos (multiplo) {
      const exists = this.multiplos.find(m => m.multiplo === multiplo.multiplo && m.ingrediente === multiplo.ingrediente)
      if (exists) {
        if (multiplo.quantidade === 0) {
          this.multiplos = this.multiplos.filter(m => m.multiplo !== multiplo.multiplo && m.ingrediente !== multiplo.ingrediente)
          this.$emit('change', this.multiplos)
          return
        }
        this.multiplos.map(m => {
          if (m.multiplo === multiplo.multiplo && m.ingrediente === multiplo.ingrediente) {
            m.quantidade = multiplo.quantidade
          }
        })
        this.$emit('change', this.multiplos)
        return
      }

      this.multiplos = [...this.multiplos, multiplo]
      this.$emit('change', this.multiplos)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
