<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <b-btn variant="outline-white p-1 pl-4 pr-4" @click="$router.back()">
        <i class="fas fa-arrow-left"/>
      </b-btn>
      <b-btn variant="outline-white p-1 pl-4 pr-4"
             @click="$store.dispatch('pedido/listOne', this.$route.params.referencia)">
        <i class="fas fa-sync-alt"/>
      </b-btn>
    </base-header>

    <Pedido :pedido="pedido" @update="listPedido" class="m-3 mt-n5"/>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Pedido from '@/views/painel/pedido/Pedido'

  export default {
    name: 'Show',
    components: { Pedido },
    computed: {
      ...mapGetters({
        pedido: 'pedido/getCurrent'
      }),
    },
    methods: {
      ...mapActions([
        'pedido/listOne'
      ]),
      listPedido () {
        this['pedido/listOne'](this.pedido.referencia)
        this.$emit('update')
      }
    },
    async mounted () {
      if (this.$route.params.referencia) {
        await this['pedido/listOne'](this.$route.params.referencia)
      }

      this.pusher.subscribe(`pedido-update-${this.$route.params.referencia}`, channel => {
        channel.bind(`App\\Events\\pedidoEvent`, async () => {
          await this['pedido/listOne'](this.$route.params.referencia)
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
