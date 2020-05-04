<template>
  <div id="printMe">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <b-btn variant="outline-white">
        <i class="fas fa-arrow-left"/>
      </b-btn>
      <b-btn variant="outline-white">
        <i class="fas fa-sync-alt"/>
      </b-btn>
    </base-header>

    <b-card class="m-3 mt-n5">


      <div class="row">
        <div class="col">
          <h4>Cliente</h4>
          <p class="mb-0"><b>{{ pedido.cliente.nome }}</b></p>
          <p class="mb-0"><b>CPF: </b>{{ pedido.cliente.CPF }}</p>
          <p class="mb-0"><b>Fone: </b>{{ pedido.cliente.phone }}</p>
        </div>

        <div class="col">
          <div v-if="pedido.entrega">
            <h4>Entrega</h4>
            {{ pedido.entrega.CEP }}<br>
            {{ pedido.entrega.Logradouro }}<br>
            {{ pedido.entrega.Bairro }} - {{ pedido.entrega.Cidade }}<br>
            {{ pedido.entrega.Referencia }}
          </div>
          <b v-else>Retirada na Loja</b>
        </div>

        <div class="col">
          <strong>Referência: </strong>{{ pedido.referencia }}<br>
          <strong>Data: </strong>{{ pedido.created_at.date | formatDate }}<br>
          <strong v-if="pedido.agendamento">
            Encomendado para: {{ moment(pedido.agendamento).format('h:mm a - DD, MMMM, YYYY (dddd)') }}
          </strong>
        </div>
      </div>

      <TableProduto class="mt-5 mb-5" :produtos="pedido.produtos" hide-img/>
      <div v-if="pedido.observacoes">
        <h3>Observações</h3>
        <p>{{ pedido.observacoes }}</p>
      </div>

      <div class="row mt-4 mb-5" :produtos="pedido.produtos">
        <div class="col text-center">
          <h3>Status</h3>

          <strong v-if="pedido.agendamento" class="bg-danger p-1 rounded-pill text-secondary">
            Encomendado para: {{ moment(pedido.agendamento).format('h:mm a - DD, MMMM, YYYY (dddd)') }}
          </strong>

          <div v-if="pedido.status === 'Concluido' || pedido.status === 'Cancelado'">
            <div v-if="pedido.status === 'Concluido'" class="text-center">
              <h3>Concluído</h3>
              <br>
              <img src="/img/pedido/icon-finish.png" width="150">
            </div>
            <div v-else class="text-center">
              <h3>Cancelado</h3>
              <br>
              <img src="/img/pedido/icon-cancel.png" width="150">
            </div>
          </div>

          <div v-else class="mt-3">
            <b-dropdown class="w-100" :text="statusLabel(pedido.status)" variant="outline-primary">
              <b-dropdown-item @click="updatePedido('Pedido Realizado')">
                Aguardando atendimento
              </b-dropdown-item>
              <b-dropdown-item @click="updatePedido('Em Fabricação')">
                Confirmar recebimento
              </b-dropdown-item>
              <b-dropdown-item @click="updatePedido('Enviado')">
                Enviado ao cliente
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="updatePedido('Cancelado')">
                Cancelar
              </b-dropdown-item>
              <b-dropdown-item @click="updatePedido('Concluido')">
                Finalizar
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>

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
            <b-list-group-item v-if="pedido.forma_pagamento" class="d-flex justify-content-between">
              <span><b>Forma de Pagamento:</b></span>
              <span>{{ pedido.forma_pagamento.nome }}</span>
            </b-list-group-item>
            <b-list-group-item v-if="pedido.forma_pagamento === 1" class="d-flex justify-content-between">
              <span><b>Troco para:</b></span>
              <span>{{ pedido.forma_pagamento.pivot.troco | formatMoney }}</span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </b-card>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TableProduto from '@/views/produtos/TableProduto'
  import moment from 'moment'

  export default {
    name: 'Show',
    components: { TableProduto },
    computed: {
      ...mapGetters({
        pedido: 'pedido/getCurrent'
      }),
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions([
        'pedido/listOne'
      ]),
      statusLabel: function (status) {
        if (status === 'Pedido Realizado') {
          return 'Aguardando atendimento'
        } else if (status === 'Em Fabricação') {
          return 'Confirmado'
        } else if (status === 'Enviado') {
          return 'Enviado ao cliente'
        } else {
          return status
        }
      },
      updatePedido (status) {
        this.$htmlToPaper('printMe');
        // eslint-disable-next-line no-console
        console.log(status)
      },
      moment (dateTime = null) {
        moment.locale('pt-BR')
        if (dateTime) {
          return moment(dateTime)
        } else {
          return moment()
        }
      },
    },
    async mounted () {
      await this['pedido/listOne'](this.$route.params.referencia)

      this.pusher.subscribe(`pedido-update-${this.$route.params.referencia}`, channel => {
        channel.bind('pedidoEvent', () => {
          window.location.reload()
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  img {
    max-height: 35vh;
  }

  .img-transparent {
    opacity: 0.2;
    -moz-opacity: 0.2;
    filter: alpha(opacity=2);
  }
</style>
