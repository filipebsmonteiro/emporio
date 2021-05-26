<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="card">
        <div v-if="usuarios.length > 0" class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Lista de Usuários</h3>
            </div>
          </div>
        </div>

        <TableData
          :fields="fields"
          :items="usuarios"
          :paginator="pagination"
          :loading="isLoading"
          route-new="painel.usuario.create"
          text-new="Novo usuário"
          text-empty="Nenhum usuário localizado"
          @list="evt => $store.dispatch('usuario/listAllPaginated', evt)">
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.usuario.edit', params: { id } }">
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
      usuarios: 'usuario/all',
      isLoading: 'usuario/isLoading',
      pagination: 'usuario/pagination'
    })
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'id', label: 'Editar' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'usuario/listAllPaginated'
    ])
  },
  mounted () {
    this['usuario/listAllPaginated'](this.pagination)
  }
}
</script>
<style lang="scss" scoped>
i.fas {
  font-size: 1.5em;
}
</style>
