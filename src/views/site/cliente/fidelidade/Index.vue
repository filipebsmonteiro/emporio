<template>
  <div class="container">
    <b-overlay :show="isLoading">
      <div class="row">
        <div class="col">
          <b-card class="bg-gradient-primary">
            <h5 class="card-title text-uppercase text-muted mb-0 text-white">Pedidos Concluidos</h5>
            <span class="h2 font-weight-bold mb-0 text-white">{{ pedidos.length }}</span>
          </b-card>
        </div>
        <div class="col">
          <b-card class="bg-gradient-success">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0 text-white">Valor Acummulado</h5>
                <span class="h2 font-weight-bold mb-0 text-white">{{ fidelidade.acumulado_total | formatMoney }}</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-gradient-cyan text-white rounded-circle shadow">
                  <i class="fas fa-arrow-up"/>
                </div>
              </div>
            </div>
          </b-card>
        </div>
        <div class="col">
          <b-card class="bg-gradient-danger">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0 text-white">Valor Resgatado</h5>
                <span class="h2 font-weight-bold mb-0 text-white">{{ fidelidade.resgatado_total | formatMoney }}</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                  <i class="fas fa-arrow-down"/>
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </b-overlay>

    <div class="row mt-4 mb-5">
      <div class="col-md-7">
        <b-overlay :show="isLoadingPedidos">
          <b-card no-body class="shadow">
          <b-table :items="pedidos" :fields="pedidos_fields" responsive>
            <template v-slot:cell(created_at)="{ item }">
              {{ item.created_at | formatDate }}
            </template>
            <template v-slot:cell(status)="{ item }">
              <b-badge variant="success">{{ item.status }}</b-badge>
            </template>
            <template v-slot:cell(valor)="{ item }">
              {{ item.valor| formatMoney }}
            </template>
            <template v-slot:cell(loja)="{ item }">
              {{ item.loja }}
            </template>
          </b-table>
        </b-card>
        </b-overlay>
      </div>


      <div class="col-md-5">
        <b-overlay :show="isLoadingFidelidade">
          <b-card no-body class="shadow">
            <b-table :items="fidelidade.resgates" :fields="resgates_fields" responsive>
              <template v-slot:cell(valorResgate)="{ item: { valorResgate }}">
                {{ valorResgate | formatMoney }}
              </template>
              <template v-slot:cell(created_at)="{ item: { created_at }}">
                {{ created_at | formatDate }}
              </template>
            </b-table>
          </b-card>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters(  {
        pedidos: 'pedido/all',
        isLoadingPedidos: 'pedido/isLoading',
        store_fidelidade: 'fidelidade/all',
        isLoadingFidelidade: 'fidelidade/isLoading'
      }),
      fidelidade () {
        if (this.store_fidelidade && this.store_fidelidade.acumulados && this.store_fidelidade.resgates) {
          const fidelidade = {
            ...this.store_fidelidade,
            acumulado_qtd: this.store_fidelidade.acumulados.length,
            acumulado_total: this.store_fidelidade.acumulados.reduce(function (prev, cur) {
              return prev + cur.valorAcumulado
            }, 0),
            resgatado_qtd: this.store_fidelidade.resgates.length,
            resgatado_total: this.store_fidelidade.resgates.reduce(function (prev, cur) {
              return prev + cur.valorResgate
            }, 0)
          }
          return fidelidade
        }
        return []
      },
      isLoading () {
        if (this.isMounted && !this.isLoadingPedidos && !this.isLoadingFidelidade) {
          return true
        }

        return false
      },
    },
    data () {
      return {
        pedidos_fields: [
          { key: 'created_at', label: 'Data' },
          { key: 'status', label: 'status' },
          { key: 'valor', label: 'Valor' },
          { key: 'referencia', label: 'Referência' },
          { key: 'loja', label: 'Loja' },
        ],
        resgates_fields: [
          { key: 'created_at', label: 'Data' },
          { key: 'valor', label: 'Valor' },
        ]
      }
    },
    methods: {
      ...mapActions([
        'pedido/listAll',
        'fidelidade/listAll'
      ]),
    },
    async mounted () {
      await this['pedido/listAll']({
        'filters': [
          ['status', '!=', 'Cancelado'],
          ['created_at', '>=', moment().subtract(12, 'month').startOf('day').format()]
        ]
      })
      await this['fidelidade/listAll']()
    }
  }
</script>

<style lang="scss" scoped>
</style>
