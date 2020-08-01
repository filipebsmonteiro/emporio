<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="card">
        <div v-if="clientes.length > 0" class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Lista de Clientes</h3>
            </div>
          </div>
        </div>

        <TableData
          :fields="fields"
          :items="clientes"
          :paginator="pagination"
          :loading="isLoading"
          text-empty="Nenhum cliente localizado"
          @list="evt => $store.dispatch('cliente/listAllPaginated', evt)">
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.cliente.edit', params: { id } }">
              <i class="fas fa-edit"/>
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
