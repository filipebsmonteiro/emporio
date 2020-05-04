<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <b-card no-body class="m-3 mt-n5">
      <b-table :fields="fields" :items="pedidos" responsive="">
        <template v-slot:cell(referencia)="{ item: { referencia } }">
          <router-link :to="{ name: 'painel.pedido.show', params: { referencia } }">
            {{ referencia }}
          </router-link>
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
      </b-table>
    </b-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters({
        pedidos: 'pedido/getAll'
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
        'pedido/listAll'
      ])
    },
    mounted () {
      if (!parseInt(process.env.VUE_APP_PERMITE_AGENDAMENTO)){
        this.fields = this.fields.filter(f => f.key !== 'agendamento')
      }
      this['pedido/listAll']()

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
