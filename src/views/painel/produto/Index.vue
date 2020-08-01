<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <b-overlay :show="isLoading">
        <div class="card">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Produtos</h3>
              </div>
              <div class="col text-right">
                <router-link size="sm" class="btn btn-primary" :to="{ name: 'painel.produto.create' }">Novo
                </router-link>
              </div>
            </div>
          </div>

          <TableData
            :fields="fields"
            :fields-filter="filter"
            :items="produtos"
            :loading="isLoading"
            :paginator="pagination"
            route-new="painel.produto.create"
            text-new="Novo"
            text-empty="Nenhum produto encontrado"
            @list="evt => $store.dispatch('produto/listAllPaginated', evt)">
            <template v-slot:cell(preco)="{ item: { preco } }">
              {{ preco | formatMoney }}
            </template>
            <template v-slot:cell(category)="{ item: { categoria } }">
              <span v-if="categoria.grupo"><b>Grupo: </b> {{ categoria.grupo }}</span><br>
              <span><b>Nome: </b> {{ categoria.nome }}</span>
            </template>
            <template v-slot:cell(id)="{ item: { id, status } }">
              <b-btn v-if="status==='Desabilitado'" variant="outline-warning" size="sm"
                     title="Desabilitado por falta de Ingrediente Essencial" disabled>
                <i class="fas fa-exclamation"/>
              </b-btn>
              <b-btn v-else-if="status==='Disponível'" variant="white" size="sm"
                     @click="changeStatus(id, 'Indisponível')">
                <i class="fas fa-pause"/>
              </b-btn>
              <b-btn v-else-if="status==='Indisponível'" variant="danger" size="sm"
                     @click="changeStatus(id, 'Disponível')">
                <i class="fas fa-play"/>
              </b-btn>
              <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.produto.edit', params: { id } }">
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
  import Produto from '@/repositories/Produto/Produto'
  import TableData from '@/components/TableData'

  export default {
    name: 'Index',
    components: { TableData },
    computed: {
      ...mapGetters({
        produtos: 'produto/all',
        isLoading: 'produto/isLoading',
        pagination: 'produto/pagination'
      })
    },
    data () {
      return {
        fields: [
          { key: 'nome', label: 'Nome' },
          { key: 'status', label: 'Status' },
          { key: 'preco', label: 'Preço' },
          { key: 'category', label: 'Categoria' },
          { key: 'id', label: 'Editar' }
        ],
        filter: [
          { key: 'nome', label: 'Nome' },
          { key: 'preco', label: 'Preço' },
          //{ key: 'category', label: 'Categoria' },
        ]
      }
    },
    methods: {
      ...mapActions([
        'produto/listAllPaginated'
      ]),
      changeStatus (id, status) {
        Produto.changeStatus(id, { status }).then(() => {
          this.$notify({
            type: 'success',
            title: `Status do Produto Atualizado com Sucesso!`,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
          })
          this['produto/listAllPaginated'](this.pagination)
        }).catch(error => {
          this.validaRetornoErro(error)
        })
      }
    },
    mounted () {
      this['produto/listAllPaginated'](this.pagination)
    }
  }
</script>
<style lang="scss" scoped>
  i.fas {
    font-size: 1.5em;
  }
</style>
