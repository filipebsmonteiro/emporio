<template>
  <div>
    <b-nav fill class="mt-1 bg-secondary rounded categorias">
      <b-nav-item active>
        Active
      </b-nav-item>
      <b-nav-item>
        Link
      </b-nav-item>
      <b-nav-item>
        Link with a long name
      </b-nav-item>
    </b-nav>
    <span v-for="produto in produtos">{{ produto }}</span>
    <span v-for="prod in get">{{ prod }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'Default',
  name: 'Cardapio',
  props: {
    layout: {
      type: String,
      default: 'Four'
    }
  },
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
    // this.$store.dispatch('cardapio/list')
    // this['cardapio/list']()
  },
  methods: {
    // mistura as actions nos métodos com o operador spread
    ...mapActions([
      'cardapio/list'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .categorias{
    li {
      a {
        color: #F5F5F5;
      }
    }
    li:hover{
      background-color: #47494e;
    }
  }
</style>
