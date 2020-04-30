<template>
  <div class="container">
    <b-card no-body>
      <b-table :fields="fields" :items="pedidos" responsive="">
        <template v-slot:cell(referencia)="linha">
          {{ linha.item.referencia }}
        </template>
        <template v-slot:cell(status)="linha">
          <b-badge variant="success">{{ linha.item.status}}</b-badge>
        </template>
        <template v-slot:cell(confirmed_at)="linha">
          <span v-if="linha.item.confirmed_at">{{ linha.item.confirmed_at | formatDate }}</span>
        </template>
        <template v-slot:cell(sent_at)="linha">
          <span v-if="linha.item.sent_at">{{ linha.item.sent_at | formatDate }}</span>
        </template>
        <template v-slot:cell(taxa_entrega)="linha">
          {{ linha.item.taxa_entrega | formatMoney }}
        </template>
        <template v-slot:cell(valor)="linha">
          {{ linha.item.valor | formatMoney }}
        </template>
        <template v-slot:cell(agendamento)="linha">
          <span v-if="linha.item.agendamento">{{ linha.item.agendamento | formatDate }}</span>
        </template>
        <template v-slot:cell(id)="linha">
          <base-button
            size="sm"
            type="primary"
            icon="fas fa-eye fa-2x"
            @click="$router.push({ name: 'pedido.show', params: {id: linha.item.referencia} })"
            icon-only
          />
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
          { key: 'referencia', label: 'Referência' },
          { key: 'status', label: 'status' },
          { key: 'confirmed_at', label: 'Confirmado' },
          { key: 'sent_at', label: 'Enviado' },
          { key: 'taxa_entrega', label: 'Taxa de Entrega' },
          { key: 'valor', label: 'Valor' },
          { key: 'agendamento', label: 'Agendamento' },
          { key: 'id', label: 'Visualizar' },
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
      this['pedido/listAll']([['Clientes_idClientes', '=', 1]])
    }
  }
</script>

<style lang="scss" scoped>
</style>
