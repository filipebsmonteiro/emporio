<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>Cupons</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <TableData
          :fields="fields"
          :fields-filter="filter"
          :items="cupons"
          :paginator="pagination"
          :loading="isLoading"
          text-empty="Nenhum Cupom localizado"
          route-new="painel.cupom.create"
          text-new="Novo cupom"
          @list="evt => $store.dispatch('cupom/listAllPaginated', evt)">
          <template v-slot:cell(codigo)="{ item: { codigo, hash, numerador } }">
            {{ `${codigo}-${hash || numerador}` }}
          </template>
          <template v-slot:cell(valor)="{ item: { valor, porcentagem } }">
            {{ valor | formatMoney }}
            {{ porcentagem ? `${porcentagem}%` : null }}
          </template>
          <template v-slot:head(id)>{{ null }}</template>
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.cupom.edit', params: { id } }">
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
      cupons: 'cupom/all',
      isLoading: 'cupom/isLoading',
      pagination: 'cupom/pagination'
    })
  },
  data () {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'quantidade', label: 'Quantidade' },
        { key: 'valor', label: 'Valor' },
        { key: 'id', label: 'Editar' }
      ],
      filter: [
        { key: 'codigo', label: 'Prefixo' },
        { key: 'quantidade', label: 'Quantidade' },
        { key: 'valor', label: 'Valor' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'cupom/listAllPaginated'
    ])
  },
  mounted () {
    this['cupom/listAllPaginated'](this.pagination)
  }
}
</script>
<style lang="scss" scoped>
i.fas {
  font-size: 1.5em;
}
</style>
