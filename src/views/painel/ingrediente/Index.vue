<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="card">
        <b-overlay :show="isLoading">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Ingredientes</h3>
              </div>
              <div class="col text-right">
                <router-link size="sm" class="btn btn-primary" :to="{ name: 'painel.ingrediente.create' }">Novo
                </router-link>
              </div>
            </div>
          </div>

          <b-table :items="ingredientes" :fields="fields">
            <template v-slot:cell(status)="{ item: { status } }">
              <b-badge v-if="status" variant="success">Habilitado</b-badge>
              <b-badge v-else variant="danger">Desabilitado</b-badge>
            </template>
            <template v-slot:cell(preco)="{ item: { preco } }">
              {{ preco | formatMoney }}
            </template>
            <template v-slot:cell(id)="{ item: { id } }">
              <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.ingrediente.edit', params: { id } }">
                <i class="fas fa-edit"/>
              </router-link>
            </template>
          </b-table>
          <Paginator
            v-if="pagination.total > pagination.per_page"
            :page="pagination.page"
            :per-page="pagination.per_page"
            :total="pagination.total"
            @change="evt => $store.dispatch('ingrediente/listAllPaginated', evt)"
          />
        </b-overlay>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import Paginator from '@/components/Paginator'

  export default {
    name: 'Index',
    components: { Paginator },
    computed: {
      ...mapGetters({
        ingredientes: 'ingrediente/getAll',
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
