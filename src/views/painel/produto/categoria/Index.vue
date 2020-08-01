<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <b-overlay :show="isLoading">
        <div class="card">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Categorias de Produtos</h3>
              </div>
              <div class="col text-right">
                <router-link size="sm" class="btn btn-primary" :to="{ name: 'painel.produto.categoria.create' }">Novo
                </router-link>
              </div>
            </div>
          </div>

          <TableData
            :fields="fields"
            :fields-filter="filter"
            :items="categorias"
            :loading="isLoading"
            :paginator="pagination"
            route-new="painel.produto.categoria.create"
            text-new="Nova categoria"
            text-empty="Nenhuma categoria encontrada"
            @list="evt => $store.dispatch('produto/cateogria/listAllPaginated', evt)">
            <template v-slot:cell(created_at)="{ item: { created_at } }">
              {{ created_at | formatDate }}
            </template>
            <template v-slot:cell(id)="{ item: { id } }">
              <router-link class="bn btn-link btn-sm p-0"
                           :to="{ name: 'painel.produto.categoria.edit', params: { id } }">
                <i class="fas fa-edit"/>
              </router-link>
            </template>
          </TableData>
        </div>
      </b-overlay>
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
      categorias: 'produto/categoria/all',
      isLoading: 'produto/categoria/isLoading',
      pagination: 'produto/categoria/pagination'
    })
  },
  data () {
    return {
      fields: [
        { key: 'nome', label: 'Descrição' },
        { key: 'grupo', label: 'Grupo' },
        { key: 'id', label: 'Editar' }
      ],
      filter: [
        { key: 'nome', label: 'Descrição' },
        { key: 'grupo', label: 'Grupo' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'produto/categoria/listAllPaginated'
    ])
  },
  mounted () {
    this['produto/categoria/listAllPaginated'](this.pagination)
  }
}
</script>
<style lang="scss" scoped>
i.fas {
  font-size: 1.5em;
}
</style>
