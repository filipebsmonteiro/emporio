<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>Clientes</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <TableData
          :fields="fields"
          :items="clientes"
          :paginator="pagination"
          :loading="isLoading"
          text-empty="Nenhum cliente localizado"
          @list="evt => $store.dispatch('cliente/listAllPaginated', evt)">
          <template v-slot:head(id)>{{ null }}</template>
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.cliente.edit', params: { id } }">
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
      clientes: 'cliente/all',
      isLoading: 'cliente/isLoading',
      pagination: 'cliente/pagination'
    })
  },
  data () {
    return {
      fields: [
        { key: 'id', label: 'Editar' },
        { key: 'phone', label: 'Telefone' },
        { key: 'email', label: 'Email' },
        { key: 'nome', label: 'Nome' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'cliente/listAllPaginated'
    ])
  },
  mounted () {
    this['cliente/listAllPaginated'](this.pagination)
  }
}
</script>
<style lang="scss" scoped>
i.fas {
  font-size: 1.5em;
}
</style>
