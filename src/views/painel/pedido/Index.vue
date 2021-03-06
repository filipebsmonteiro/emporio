<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-7">
      <div>
        <b-btn size="sm" variant="primary"
               @click="listPedidos([['status', '!=', 'Concluido'],['status', '!=', 'Cancelado']])">Abertos</b-btn>
        <b-btn size="sm" variant="success"
               @click="listPedidos([['status', '=', 'Concluido']])">Finalizados</b-btn>
        <b-btn size="sm" variant="danger"
               @click="listPedidos([['status', '=', 'Cancelado']])">Cancelados</b-btn>
        <b-btn size="sm" @click="listPedidos()">Todos</b-btn>
      </div>
    </base-header>
    <b-card no-body class="m-3 mt-n5">
      <TableData
        :fields="fields"
        :items="pedidos"
        :loading="isLoading"
        :paginator="pagination"
        text-empty="Nenhum pedido localizado"
        disable-filters
        @list="evt => $store.dispatch('pedido/listAllPaginated', evt)">
        <template v-slot:cell(referencia)="{ item: { referencia }, toggleDetails }">
          <router-link :to="{ name: 'painel.pedido.show', params: { referencia } }">
            {{ referencia }}
          </router-link>
          <b-btn variant="link p-2" @click="toggleDetails">
            <i class="fas fa-expand"/>
          </b-btn>
        </template>
        <template v-slot:cell(status)="{ item: { status } }">
          <b-badge variant="success">{{ status }}</b-badge>
        </template>
        <template v-slot:cell(status)="{ item: { agendamento, status } }">
          <b-badge v-if="status === 'Cancelado'" variant="danger">{{ status }}</b-badge>
          <b-badge v-else variant="success">{{ status }}</b-badge>
          <b-badge v-if="agendamento" variant="warning">Agendado</b-badge>
        </template>
        <template v-slot:cell(cliente)="{ item: { cliente } }">
          {{ cliente.nome }}
        </template>
        <template v-slot:cell(valor)="{ item: { valor, taxa_entrega } }">
          {{ valor + taxa_entrega | formatMoney }}
        </template>
        <template v-slot:cell(created_at)="{ item: { created_at } }">
          {{ created_at | formatDate }}
        </template>
        <template v-slot:row-details="{ item }">
          <Pedido :pedido="item"
                  @update="listPedidos([['status', '!=', 'Concluido'],['status', '!=', 'Cancelado']])"
                  class="shadow"/>
        </template>
      </TableData>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Pedido from '@/views/painel/pedido/Pedido'
import TableData from '@/components/TableData'

export default {
  name: 'Index',
  components: { TableData, Pedido },
  computed: {
    ...mapGetters({
      pedidos: 'pedido/all',
      isLoading: 'pedido/isLoading',
      pagination: 'pedido/pagination'
    })
  },
  data () {
    return {
      fields: [
        { key: 'referencia', label: 'Detalhes' },
        { key: 'status', label: 'Status' },
        { key: 'cliente', label: 'Cliente' },
        { key: 'valor', label: 'Valor Pagamento' },
        { key: 'created_at', label: 'Horário' },
      ]
    }
  },
  methods: {
    ...mapActions([
      'pedido/listAllPaginated'
    ]),
    async listPedidos(filters=null) {
      let params = this.pagination

      if (filters)
        params = {...params, filters}

      await this['pedido/listAllPaginated'](params)
    }
  },
  async mounted () {
    if (!parseInt(process.env.VUE_APP_PERMITE_AGENDAMENTO)) {
      this.fields = this.fields.filter(f => f.key !== 'agendamento')
    }
    await this.listPedidos([['status', '!=', 'Concluido'],['status', '!=', 'Cancelado']])
    this.pusher.subscribe(`novo-pedido`, channel => {
      channel.bind('pedidoEvent', () => {
        this.$notify({
          type: 'success',
          title: `Novo pedido Realizado!`,
          verticalAlign: 'bottom',
          horizontalAlign: 'right'
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
