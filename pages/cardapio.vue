<template>
  <div>
    <span v-for="produto in produtos">{{ produto }}</span>
    <span v-for="prod in get">{{ prod }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'Default',
  name: 'Cardapio',
  computed: {
    // mistura os getters nos dados computados com o operador spread
    ...mapGetters({
      get: 'cardapio/get'
    }),
    // Também posso recuperar os getters assim
    produtos () {
      return this.$store.state.cardapio.produtos.list
    }
  },
  mounted () {
    this.$store.dispatch('cardapio/list')
    this['cardapio/list']()
  },
  methods: {
    // mistura as actions nos métodos com o operador spread
    ...mapActions([
      'cardapio/list'
    ])
  }
}
</script>

<style scoped>

</style>
