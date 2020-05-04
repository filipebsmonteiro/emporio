<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Ingredientes</h3>
            </div>
            <div class="col text-right">
              <router-link size="sm" class="btn btn-primary" :to="{ name: 'painel.ingrediente.create' }">Novo</router-link>
            </div>
          </div>
        </div>

        <b-table :items="categorias" :fields="fields">
          <template v-slot:cell(status)="{ item: { status } }">
            <b-badge v-if="status" variant="success">Habilitado</b-badge>
            <b-badge v-else variant="danger">Desabilitado</b-badge>
          </template>
          <template v-slot:cell(preco)="{ item: { preco } }">
            {{ preco | formatMoney }}
          </template>
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="bn btn-link p-0" :to="{ name: 'painel.ingrediente.edit', params: { id } }">
              <i class="fas fa-edit fa-2x"/>
            </router-link>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters({
        categorias: 'ingrediente/getAll'
      })
    },
    data() {
      return {
        fields: [
          { key: 'nome', label: 'Nome' },
          { key: 'status', label: 'Status' },
          { key: 'preco', label: 'Preço' },
          { key: 'codigo_PDV', label: 'PDV' },
          { key: 'id', label: 'Editar' }
        ]
      }
    },
    methods: {
      ...mapActions([
        'ingrediente/listAll'
      ])
    },
    mounted() {
      this['ingrediente/listAll']()
    }
  }
</script>
<style lang="scss" scoped>
</style>
