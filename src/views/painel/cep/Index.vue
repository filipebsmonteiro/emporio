<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>CEP's</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <b-row class="m-3">
          <b-col md="4" sm="12">
            <b-form-group label="Bairro">
              <b-select
                :options="bairros"
                class="rounded-pill"
                placeholder="Selecione o baiiro"
                @change="evt => $store.dispatch('cep/listAll', {filters: [['Bairro', '=', evt]]})"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Filtro">
              <b-form-input
                id="filter-input"
                v-model="table.filter"
                class="rounded-pill"
                type="search"
                placeholder="Digite para buscar"
                list="filter-suggestion"
              />
              <b-form-datalist id="filter-suggestion" :options="ceps.filter(c => {return c.Logradouro.split(' ')[0]})" />
<!--                <option v-for="option in ceps.filter(c => {return c.Logradouro.split(' ')[0]})">{{ option }}</option>-->
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Quantidade por página">
              <b-form-select v-model="table.perPage" class="rounded-pill" :options="table.pageOptions" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-overlay :show="isLoading">
          <b-table :items="ceps" :filter="table.filter"
                   :fields="table.fields" show-empty
                   :filter-included-fields="['Logradouro']"
                   empty-filtered-text="Nenhum CEP localizado">
            <template v-slot:head(id)>
              <b-checkbox v-model="header.checked" @change="changeHeader('checked')" />
            </template>
            <template v-slot:head(taxaEntrega)>
              <b-form-group label="Valor da Taxa de Entrega" label-class="p-0" class="m-0">
                <b-input
                  v-if="header.checked"
                  v-model="header.taxaEntrega"
                  placeholder="Alterar Filtrados"
                  min="0"
                  step="0.01"
                  type="number"
                  size="sm rounded-pill"
                  debounce="500"
                  @change="changeHeader('taxaEntrega')"
                />
              </b-form-group>
            </template>
            <template v-slot:head(vlr_minimo_pedido)>
              <b-form-group label="Valor Mínimo por Pedido" label-class="p-0" class="m-0">
                <b-input
                  v-if="header.checked"
                  v-model="header.vlrMinimo"
                  placeholder="Alterar Filtrados"
                  min="0"
                  step="0.01"
                  type="number"
                  size="sm rounded-pill"
                  debounce="500"
                  @change="changeHeader('vlrMinimo')"
                />
              </b-form-group>
            </template>

            <template v-slot:cell(id)="{index, item: { id }}">
              <b-checkbox v-model="model.checked[id]" />
            </template>
            <template v-slot:cell(taxaEntrega)="{ index,item: { id, taxaEntrega } }">
              <b-input
                size="sm rounded-pill"
                type="number"
                min="0"
                step="0.01"
                v-model="model.taxaEntrega[id]"
                :value="taxaEntrega"
              />
            </template>
            <template v-slot:cell(vlr_minimo_pedido)="{ index, item: { id, vlr_minimo_pedido } }">
              <b-input
                size="sm rounded-pill"
                type="number"
                min="0"
                step="0.01"
                v-model="model.vlrMinimo[id]"
                :value="vlr_minimo_pedido"
              />
            </template>
          </b-table>
          <b-pagination v-model="table.currentPage" :total-rows="table.totalRows" :per-page="table.perPage" align="center"/>
        </b-overlay>
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
      bairros: 'cep/allBairros',
      ceps: 'cep/all',
      isLoading: 'cep/isLoading',
      pagination: 'cep/pagination'
    }),
  },
  data () {
    return {
      header: {
        checked: false,
        taxaEntrega: null,
        vlrMinimo: null,
      },
      table: {
        filter: null,
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, { value: 100, text: "Máximo" }],
        fields: [
          {key: 'id', value: 'ID'},
          {key: 'taxaEntrega', value: 'Taxa de Entrega'},
          {key: 'vlr_minimo_pedido', value: 'vlr_minimo_pedido'},
          {key: 'Logradouro', value: 'Logradouro'},
          {key: 'Local', value: 'Local'},
        ]
      },
      model: {
        checked: {},
        taxaEntrega: {},
        vlrMinimo: {},
      }
    }
  },
  methods: {
    ...mapActions([
      'cep/listAll',
      'cep/listBairros',
    ]),
    changeHeader(property) {
      if (property === 'checked') {
        this.ceps.map((c) => {
          this.model.checked[c.id] = !this.header.checked
        })
      }
      if (property === 'taxaEntrega') {
        this.ceps.map((c) => {
          this.model.taxaEntrega[c.id] = 0
          if (this.model.checked[c.id]) {
            this.model.taxaEntrega[c.id] = this.header.taxaEntrega
          }
        })
      }
      if (property === 'vlrMinimo') {
        this.ceps.map((c) => {
          this.model.vlrMinimo[c.id] = 0
          if (this.model.checked[c.id]) {
            this.model.vlrMinimo[c.id] = this.header.vlrMinimo
          }
        })
      }
      this.$forceUpdate()

      // this.header[property] = value
    }
  },
  mounted () {
    this['cep/listBairros']()
  }
}
</script>

<style lang="scss" scoped>
select.rounded-pill:active {
  border-radius: 20px 20px 0 0 !important;
}
</style>
