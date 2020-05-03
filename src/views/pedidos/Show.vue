<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h2>Status do Pedido</h2>
      <span><b>Referência:</b> {{ pedido.referencia }}</span>
    </div>

    <div v-if="pedido.status != 'Cancelado' && pedido.status != 'Concluido'">
      <div class="row mt-5">
        <div class="col"><h3>Realizado</h3></div>
        <div class="col"/>
        <div class="col text-center"><h3>Em Fabricação</h3></div>
        <div class="col"/>
        <div class="col"><h3>Enviado</h3></div>
      </div>
      <div class="row mt-2">
        <div :class="{
          'col': true,
          'img-transparent': !['Pedido Realizado', 'Em Fabricação', 'Enviado'].includes(pedido.status)
        }">
          <img src="/img/pedido/icon-cart.png" class="w-100" alt="">
        </div>
        <div :class="{
          'col d-flex': true,
          'img-transparent': !['Em Fabricação', 'Enviado'].includes(pedido.status)
        }">
          <i class="fas fa-arrow-right fa-5x m-auto"/>
        </div>
        <div :class="{
          'col': true,
          'img-transparent': !['Em Fabricação', 'Enviado'].includes(pedido.status)
        }">
          <img src="/img/pedido/icon-feature.png" class="w-100" alt="">
        </div>
        <div :class="{
          'col d-flex': true,
          'img-transparent': !['Enviado'].includes(pedido.status)
        }">
          <i class="fas fa-arrow-right fa-5x m-auto"/>
        </div>
        <div :class="{
          'col': true,
          'img-transparent': !['Enviado'].includes(pedido.status)
        }">
          <img src="/img/pedido/icon-delivery.png" class="w-100" alt="">
        </div>
      </div>
    </div>
    <div v-else class="d-flex mt-5">
      <div v-if="pedido.status === 'Concluido'" class="m-auto text-center">
        <h3 class="mb-3">Concluído</h3>
        <img src="/img/pedido/icon-finish.png">
      </div>
      <div v-else class="m-auto text-center">
        <h3 class="mb-3">Cancelado</h3>
        <img src="/img/pedido/icon-cancel.png" alt="" class="h-25 m-auto">
      </div>
    </div>

    <div v-if="pedido.agendamento" class="mt-5">
      <h3>Pedido Agendado</h3>
      <p>Agendado para:</p>
      <p>{{ pedido.agendamento | formatDate }}</p>
    </div>

    <TableProduto class="mt-4 mb-5" :produtos="pedido.produtos"/>

    <div class="row">
      <div class="col">
        <h3>Pagamentos</h3>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TableProduto from '@/views/produtos/TableProduto'

  export default {
    name: 'Show',
    components: { TableProduto },
    computed: {
      ...mapGetters({
        pedidos: 'pedido/getCurrent'
      }),
      pedido() {
        return {
          ...this.pedidos,
          //status: 'Concluido',
          agendamento: '2020-08-02 13:30:00'
        }
      }
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
  img {
    max-height: 35vh;
  }
  .img-transparent{
    opacity:0.2;
    -moz-opacity: 0.2;
    filter: alpha(opacity=2);
  }
</style>
