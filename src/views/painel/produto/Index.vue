<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>Produtos</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <b-overlay :show="isLoading">
        <div class="card">
          <TableData
            :fields="fields"
            :fields-filter="filter"
            :items="produtos"
            :loading="isLoading"
            :paginator="pagination"
            route-new="painel.produto.create"
            text-new="Novo produto"
            text-empty="Nenhum produto encontrado"
            @list="evt => $store.dispatch('produto/listAllPaginated', evt)">
            <template v-slot:cell(status)="{ item: { id, status } }">
              <b-btn v-if="status==='Desabilitado'"
                       variant="warning"
                       size="sm"
                       title="Desabilitado por falta de Ingrediente Essencial"
                       v-b-tooltip
                       pill>
                {{ status }}
              </b-btn>
              <b-btn v-else-if="status==='Disponível'" variant="success" size="sm" pill>
                {{ status }}
                <b-badge variant="success ml-2" @click="changeStatus(id, 'Indisponível')" pill>
                  <i class="fas fa-pause"/>
                </b-badge>
              </b-btn>
              <b-btn v-else-if="status==='Indisponível'" variant="danger" size="sm" pill>
                {{ status }}
                <b-badge variant="danger ml-2" @click="changeStatus(id, 'Disponível')" pill>
                  <i class="fas fa-play"/>
                </b-badge>
              </b-btn>
            </template>
            <template v-slot:cell(preco)="{ item: { preco } }">
              {{ preco | formatMoney }}
            </template>
            <template v-slot:cell(category)="{ item: { categoria } }">
              <span v-if="categoria.grupo"><b>Grupo: </b> {{ categoria.grupo }}</span><br>
              <span><b v-if="categoria.grupo">Nome: </b> {{ categoria.nome }}</span>
            </template>
            <template v-slot:head(id)>{{ null }}</template>
            <template v-slot:cell(id)="{ item: { id, status } }">
              <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.produto.edit', params: { id } }">
                <i class="fas fa-pencil-alt"/>
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
