<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="card">
        <b-overlay :show="isLoading">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Lista de Clientes</h3>
              </div>
            </div>
          </div>

          <b-table :items="clientes" :fields="fields" responsive>
            <template v-slot:cell(id)="{ item: { id } }">
              <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.cliente.edit', params: { id } }">
                <i class="fas fa-edit"/>
              </router-link>
            </template>
          </b-table>
          <Paginator
            v-if="pagination.total > pagination.per_page"
            :page="pagination.page"
            :per-page="pagination.per_page"
            :total="pagination.total"
            @change="evt => $store.dispatch('cliente/listAllPaginated', evt)"
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
        clientes: 'cliente/getAll',
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
