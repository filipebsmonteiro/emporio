<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="card">
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
              <i class="fas fa-edit fa-2x"/>
            </router-link>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters({
        clientes: 'cliente/getAll'
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
        'cliente/listAll'
      ])
    },
    mounted () {
      this['cliente/listAll']()
    }
  }
</script>
<style lang="scss" scoped>
</style>
