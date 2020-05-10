<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Produtos</h3>
            </div>
            <div class="col text-right">
              <router-link size="sm" class="btn btn-primary" :to="{ name: 'painel.produto.create' }">Novo</router-link>
            </div>
          </div>
        </div>

        <b-table :items="categorias" :fields="fields" responsive>
          <template v-slot:cell(id)="{ item: { id, status } }">
            <b-btn v-if="status==='Disponível'" variant="white" size="sm" @click="changeStatus(id, 'Indisponível')">
              <i class="fas fa-pause"/>
            </b-btn>
            <b-btn v-else variant="danger" size="sm" @click="changeStatus(id, 'Disponível')">
              <i class="fas fa-play"/>
            </b-btn>
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.produto.edit', params: { id } }">
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
  import Produto from '@/services/Produto/Produto'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters({
        categorias: 'produto/getAll'
      })
    },
    data() {
      return {
        fields: [
          { key: 'nome', label: 'Nome' },
          { key: 'status', label: 'Status' },
          { key: 'preco', label: 'Preço' },
          { key: 'category', label: 'Categoria' },
          { key: 'id', label: 'Editar' }
        ]
      }
    },
    methods: {
      ...mapActions([
        'produto/listAll'
      ]),
      changeStatus (id, status) {
        Produto.changeStatus(id, { status }).then(() => {
          this.$notify({
            type: 'success',
            title: `Status do Produto Atualizado com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this['produto/listAll']()
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      }
    },
    mounted() {
      this['produto/listAll']()
    }
  }
</script>
<style lang="scss" scoped>
</style>
