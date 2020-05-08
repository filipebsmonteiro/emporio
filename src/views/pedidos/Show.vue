<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h2>Status do Pedido</h2>
      <span><b>Referência:</b> {{ pedido.referencia }}</span>
    </div>

    <div v-if="pedido.status != 'Cancelado' && pedido.status != 'Concluido'">
      <div class="row mt-5">
        <div class="col text-center"><h3>Realizado</h3></div>
        <div class="col"/>
        <div class="col text-center"><h3>Em Fabricação</h3></div>
        <div class="col"/>
        <div class="col text-center"><h3>Enviado</h3></div>
      </div>
      <div class="row mt-2">
        <div :class="{
          'col text-center': true,
          'img-transparent': !['Pedido Realizado', 'Em Fabricação', 'Enviado'].includes(pedido.status)
        }">
          <img src="/img/pedido/icon-cart.png">
        </div>
        <div :class="{
          'col d-flex': true,
          'img-transparent': !['Em Fabricação', 'Enviado'].includes(pedido.status)
        }">
          <i class="fas fa-arrow-right fa-5x m-auto"/>
        </div>
        <div :class="{
          'col text-center': true,
          'img-transparent': !['Em Fabricação', 'Enviado'].includes(pedido.status)
        }">
          <img src="/img/pedido/icon-feature.png">
        </div>
        <div :class="{
          'col d-flex': true,
          'img-transparent': !['Enviado'].includes(pedido.status)
        }">
          <i class="fas fa-arrow-right fa-5x m-auto"/>
        </div>
        <div :class="{
          'col text-center': true,
          'img-transparent': !['Enviado'].includes(pedido.status)
        }">
          <img src="/img/pedido/icon-delivery.png">
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

    <TableProduto class="mt-5 mb-5" :produtos="pedido.produtos"/>

    <div class="row mt-4 mb-5" :produtos="pedido.produtos">
      <div class="col">
        <h3>Pagamentos</h3>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between">
            <span><b>SubTotal:</b></span>
            <span>{{ pedido.valor | formatMoney }}</span>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between">
            <span><b>Taxa de Entrega:</b></span>
            <span>{{ pedido.taxa_entrega | formatMoney }}</span>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between bg-success">
            <span><b>Valor do Pagamento:</b></span>
            <span>{{ pedido.valor + pedido.taxa_entrega | formatMoney }}</span>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between">
            <span><b>Forma de Pagamento:</b></span>
            <span v-if="pedido.forma_pagamento">{{ pedido.forma_pagamento.nome }}</span>
          </b-list-group-item>
          <b-list-group-item v-if="pedido.forma_pagamento && pedido.forma_pagamento.id === 1"
                             class="d-flex justify-content-between">
            <span><b>Troco para:</b></span>
            <span>{{ pedido.forma_pagamento.pivot.troco | formatMoney }}</span>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="col">
        <div v-if="pedido.observacoes">
          <h3>Observações</h3>
          <p>{{ pedido.observacoes }}</p>
        </div>
      </div>
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
    async mounted() {
      await this['pedido/listOne'](this.$route.params.referencia)

      this.pusher.subscribe(`pedido-update-${this.$route.params.referencia}`, channel => {
        channel.bind(`App\\Events\\pedidoEvent`, async () => {
          //window.location.reload()
          await this['pedido/listOne'](this.$route.params.referencia)
        })
      })
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
