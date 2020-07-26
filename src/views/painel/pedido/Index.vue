<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8" />
    <b-card no-body class="m-3 mt-n5">
      <b-overlay :show="isLoading">
        <b-table :fields="fields" :items="pedidos" striped responsive>
          <template v-slot:cell(referencia)="{ item: { referencia }, toggleDetails }">
            <router-link :to="{ name: 'painel.pedido.show', params: { referencia } }">
              {{ referencia }}
            </router-link>
            <b-btn variant="link p-2" @click="toggleDetails">
              <i class="fas fa-expand"/>
            </b-btn>
          </template>
          <template v-slot:cell(status)="{ item: { status } }">
            <b-badge variant="success">{{ status}}</b-badge>
          </template>
          <template v-slot:cell(status)="{ item: { agendamento, status } }">
            <b-badge v-if="agendamento" variant="warning">Agendado</b-badge>
            <b-badge v-else variant="success">{{ status }}</b-badge>
          </template>
          <template v-slot:cell(cliente)="{ item: { cliente } }">
            {{ cliente.nome }}
          </template>
          <template v-slot:cell(valor)="{ item: { valor, taxa_entrega } }">
            {{ valor + taxa_entrega | formatMoney }}
          </template>
          <template v-slot:cell(created_at)="{ item: { created_at } }">
            {{ created_at.date | formatDate }}
          </template>
          <template v-slot:row-details="{ item }">
            <Pedido :pedido="item" @update="$store.dispatch('pedido/listAllPaginated')" class="shadow"/>
          </template>
        </b-table>
        <Paginator
          v-if="pagination.total > pagination.per_page"
          :page="pagination.page"
          :per-page="pagination.per_page"
          :total="pagination.total"
          @change="evt => $store.dispatch('pedido/listAllPaginated', evt)"
        />
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Pedido from '@/views/painel/pedido/Pedido'
  import Paginator from '@/components/Paginator'

  export default {
    name: 'Index',
    components: { Paginator, Pedido },
    computed: {
      ...mapGetters({
        pedidos: 'pedido/getAll',
        isLoading: 'pedido/isLoading',
        pagination: 'pedido/pagination'
      })
    },
    data() {
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
      ])
    },
    mounted () {
      if (!parseInt(process.env.VUE_APP_PERMITE_AGENDAMENTO)){
        this.fields = this.fields.filter(f => f.key !== 'agendamento')
      }
      this['pedido/listAllPaginated'](this.pagination)

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
