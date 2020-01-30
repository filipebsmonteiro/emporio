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
    <Four :produtos="produtos" />
    <div id="produtosComponent" :produtos="produtos" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Four from './layouts/Four'

export default {
  layout: 'default',
  name: 'Index',
  components: { Four },
  props: {
    layout: {
      type: String,
      default: 'Four'
    }
  },
  data () {
    return {
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
    this.$store.dispatch('cardapio/list')
    // this['cardapio/list']()

    const app = new Vue({
      el: '#produtosComponent',
      data: {
        produtos: this.produtos
      },
      template: this.layout
    })
    app._init()
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
