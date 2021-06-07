<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>Ingredientes</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <b-overlay :show="isLoading">
          <TableData
            :fields="fields"
            :fields-filter="filter"
            :items="ingredientes"
            :loading="isLoading"
            :paginator="pagination"
            route-new="painel.ingrediente.create"
            text-new="Novo ingrediente"
            text-empty="Nenhum ingrediente encontrado"
            @list="evt => $store.dispatch('ingrediente/listAllPaginated', evt)">
            <template v-slot:cell(status)="{ item: { status } }">
              <b-badge v-if="status" variant="success">Habilitado</b-badge>
              <b-badge v-else variant="danger">Desabilitado</b-badge>
            </template>
            <template v-slot:cell(preco)="{ item: { preco } }">
              {{ preco | formatMoney }}
            </template>
            <template v-slot:head(id)>{{ null }}</template>
            <template v-slot:cell(id)="{ item: { id } }">
              <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.ingrediente.edit', params: { id } }">
                <i class="fas fa-pencil-alt"/>
              </router-link>
            </template>
          </TableData>
        </b-overlay>
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
        ingredientes: 'ingrediente/all',
        isLoading: 'ingrediente/isLoading',
        pagination: 'ingrediente/pagination'
      })
    },
    data () {
      return {
        fields: [
          { key: 'nome', label: 'Nome' },
          { key: 'status', label: 'Status' },
          { key: 'preco', label: 'Preço' },
          { key: 'id', label: 'Editar' }
        ],
        filter: [
          { key: 'nome', label: 'Nome' },
          { key: 'preco', label: 'Preço' }
        ]
      }
    },
    methods: {
      ...mapActions([
        'ingrediente/listAllPaginated'
      ])
    },
    mounted () {
      this['ingrediente/listAllPaginated'](this.pagination)
    }
  }
</script>
<style lang="scss" scoped>
  i.fas {
    font-size: 1.5em;
  }
</style>
