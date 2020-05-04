<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Categorias de Produtos</h3>
            </div>
            <div class="col text-right">
              <router-link size="sm" class="btn btn-primary" :to="{ name: 'painel.produto.categoria.create' }">Novo</router-link>
            </div>
          </div>
        </div>

        <b-table :items="categorias" :fields="fields">
          <template v-slot:cell(created_at)="{ item: { created_at } }">
            {{ created_at | formatDate }}
          </template>
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="bn btn-link p-0" :to="{ name: 'painel.produto.categoria.edit', params: { id } }">
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
        categorias: 'produto/categoria/getAll'
      })
    },
    data() {
      return {
        fields: [
          { key: 'nome', label: 'Nome' },
          { key: 'grupo', label: 'Grupo' },
          { key: 'created_at', label: 'Criado em' },
          { key: 'id', label: 'Editar' }
        ]
      }
    },
    methods: {
      ...mapActions([
        'produto/categoria/listAll'
      ])
    },
    mounted() {
      this['produto/categoria/listAll']()
    }
  }
</script>
<style lang="scss" scoped>
</style>
