<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Categorias de Produtos</h3>
            </div>
            <div class="col text-right">
              <base-button size="sm" type="primary">Novo</base-button>
            </div>
          </div>
        </div>

        <b-table :items="categorias" :fields="fields">
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="bn btn-link p-0" :to="{ name: 'painel.produto.categoria.produto.edit', params: { id } }">
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
