<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>Lojas</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <TableData
          :fields="fields"
          :initial="initial"
          :items="lojas"
          :paginator="pagination"
          :loading="isLoading"
          route-new="painel.loja.create"
          text-new="Nova Loja"
          text-empty="Nenhuma loja localizada"
          @list="evt => $store.dispatch('loja/listAllPaginated', evt)">
          <template v-slot:cell(agendamentos)="{ item: { agendamentos } }">
            <b-badge v-if="agendamentos" variant="success">Habilitado</b-badge>
            <b-badge v-else variant="danger">Desabilitado</b-badge>
          </template>
          <template v-slot:cell(pagamentosOnline)="{ item: { pagamentosOnline } }">
            <b-badge v-if="pagamentosOnline" variant="success">Habilitado</b-badge>
            <b-badge v-else variant="danger">Desabilitado</b-badge>
          </template>
          <template v-slot:head(id)>{{ null }}</template>
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.loja.edit', params: { id } }">
              <i class="fas fa-pencil-alt"/>
            </router-link>
          </template>
        </TableData>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import TableData from '@/components/TableData'

export default {
  name: 'Index',
  components: { TableData },
  computed: {
    ...mapGetters({
      lojas: 'loja/all',
      isLoading: 'loja/isLoading',
      pagination: 'loja/pagination'
    })
  },
  data () {
    return {
      fields: [
        { key: 'fantasia', label: 'Fantasia' },
        { key: 'CNPJ', label: 'CNPJ' },
        { key: 'razao_social', label: 'Razão Social' },
        { key: 'abreviacao', label: 'Abreviação' },
        { key: 'phone', label: 'Telefone' },
        { key: 'CEP', label: 'CEP' },
        { key: 'Logradouro', label: 'Logradouro' },
        { key: 'Bairro', label: 'Bairro' },
        { key: 'Cidade', label: 'Cidade' },
        { key: 'latitude', label: 'Latitude' },
        { key: 'longitude', label: 'Longitude' },
        { key: 'vlr_minimo_pedido', label: 'Valor mínimo do Pedido' },
        { key: 'agendamentos', label: 'Aceita agendamentos' },
        { key: 'pagamentosOnline', label: 'Aceita Pagamentos online' },
        { key: 'id', label: 'Editar' }
      ],
      initial: ['fantasia', 'CNPJ', 'Bairro', 'id']
    }
  },
  methods: {
    ...mapActions([
      'loja/listAllPaginated'
    ])
  },
  mounted () {
    this['loja/listAllPaginated'](this.pagination)
  }
}
</script>
<style lang="scss" scoped>
i.fas {
  font-size: 1.5em;
}
</style>
