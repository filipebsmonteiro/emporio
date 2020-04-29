<template>
  <div class="container">
    <pre>{{ pedido }}</pre>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Show',
    computed: {
      ...mapGetters({
        pedido: 'pedido/getCurrent'
      }),
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions([
        'pedido/listOne'
      ]),
    },
    mounted() {
      this['pedido/listOne'](this.$route.params.referencia)
    }
  }
</script>

<style lang="scss" scoped>
</style>
