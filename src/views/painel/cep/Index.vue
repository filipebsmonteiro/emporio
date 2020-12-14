<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>CEP's</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <b-select
          class="rounded-pill"
          :options="bairros"
          @change="evt => $store.dispatch('cep/listAll', {filters: [['Bairro', '=', evt]]})" />
        <b-select class="rounded-pill" :options="prefixos" v-model="filter" />
        <TableData
          :items="ceps"
          :paginator="pagination"
          :loading="isLoading"
          :filter="filter"
          text-empty="Nenhum CEP localizado">

          <template v-slot:table-data-filters>
<!--            <FilterInputGroup :options="[]" @search="evt => {}" />-->
          </template>

          <template v-slot:head(id)>
            <b-checkbox/>
          </template>



          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.cliente.edit', params: { id } }">
              <i class="fas fa-pencil-alt"/>
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
      bairros: 'cep/allBairros',
      ceps: 'cep/all',
      isLoading: 'cep/isLoading',
      pagination: 'cep/pagination'
    }),
    prefixos() {
      return this.ceps.reduce(function (prev, cur) {
        if (prev.includes(cur.prefixo)) {
          return prev
        }
        return [...prev, cur.prefixo]
      }, [])
    }
  },
  data () {
    return {
      filter: null
    }
  },
  methods: {
    ...mapActions([
      'cep/listAll',
      'cep/listBairros',
    ])
  },
  mounted () {
    this['cep/listBairros']()
  }
}
</script>
