<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5">
      <h1>CEP's</h1>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="card">
        <b-row class="m-3">
          <b-col md="2" sm="12">
            <b-form-group label="Bairro">
              <b-select :options="bairros" class="rounded-pill" size="sm" @change="listCeps"/>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Vínculo">
              <b-select
                v-model="filter.available"
                class="rounded-pill"
                size="sm"
                :options="[
                  {text: 'Disponíveis', value: 'available'},
                  {text: 'Vinculados', value: 'attached'}
                ]" />
            </b-form-group>
          </b-col>
          <b-col md="5" sm="12"/>
          <b-col md="3" sm="12">
            <b-form-group v-if="ceps.length > 0" label="Filtro">
              <b-form-input
                v-model="filter.text"
                class="rounded-pill"
                size="sm"
                type="search"
                placeholder="Digite para buscar"
                list="filter-suggestion"
              />
              <b-form-datalist v-if="ceps" id="filter-suggestion">
                <!-- Pega O prefixo de todos os endereços sem repetir -->
                <option :key="prefix" v-for="prefix in prefixes">{{ prefix }}</option>
              </b-form-datalist>
            </b-form-group>
          </b-col>
        </b-row>

        <b-overlay :show="isLoading">
          <b-table id="ceps-table"
                   :items="ceps"
                   :filter="filter.text"
                   :fields="table.fields"
                   :filter-included-fields="['logradouro']"
                   :current-page="table.currentPage"
                   :per-page="table.perPage"
                   @filtered="onFiltered"
                   empty-text="Selecione o Bairro"
                   empty-filtered-text="Nenhum CEP localizado"
                   show-empty
                   responsive
                   small
                   striped
          >
            <template v-slot:head(id)>
              <b-checkbox v-model="table.checkFiltered" @change="evt => changeHeader('checkbox', evt)"/>
            </template>
            <template v-slot:head(taxa_entrega)>
              <b-form-group label-class="p-0" class="m-0">
                <template v-slot:label>
                  <span v-if="!table.checkFiltered">Valor da Taxa de Entrega</span>
                  <b-input
                    v-else
                    placeholder="Alterar Taxas dos Filtrados"
                    min="0"
                    step="0.01"
                    type="number"
                    size="sm rounded-pill"
                    debounce="500"
                    @change="evt => changeHeader('taxa_entrega', evt)"
                  />
                </template>
              </b-form-group>
            </template>
            <template v-slot:head(vlr_minimo_pedido)>
              <b-form-group label-class="p-0" class="m-0">
                <template v-slot:label>
                  <span v-if="!table.checkFiltered">Valor Minimo por Pedido</span>
                  <b-input
                    v-else
                    placeholder="Alterar Valor Minimo dos Filtrados"
                    min="0"
                    step="0.01"
                    type="number"
                    size="sm rounded-pill"
                    debounce="500"
                    @change="evt => changeHeader('vlr_minimo_pedido', evt)"
                  />
                </template>
              </b-form-group>
            </template>

            <template v-slot:cell(id)="{item: { id, isChecked }}">
              <b-checkbox v-model="isChecked" size="sm" @change="evt => changeUnique(id, 'checkbox', evt)"/>
            </template>
            <template v-slot:cell(taxa_entrega)="{ item: { id, isChecked, taxa_entrega } }">
              <b-input
                v-model="taxa_entrega"
                :disabled="!isChecked"
                @change="evt => changeUnique(id, 'taxa_entrega', evt)"
                size="sm form-control-alternative form-control-plaintext"
                type="number"
                min="0"
                step="0.01"
              />
            </template>
            <template v-slot:cell(vlr_minimo_pedido)="{ item: { id, isChecked, vlr_minimo_pedido } }">
              <b-input
                v-model="vlr_minimo_pedido"
                :disabled="!isChecked"
                @change="evt => changeUnique(id, 'vlr_minimo_pedido', evt)"
                size="sm form-control-alternative form-control-plaintext"
                type="number"
                min="0"
                step="0.01"
              />
            </template>
          </b-table>
          <b-row class="m-3 align-items-center">
            <b-col md="3" sm="12"/>
            <b-col md="5" sm="12">
              <b-pagination
                v-if="ceps.length > 0"
                v-model="table.currentPage"
                :total-rows="table.totalRows"
                :per-page="table.perPage"
                align="center"
                aria-controls="ceps-table"
              />
            </b-col>
            <b-col md="2" sm="12"/>
            <b-col md="2" sm="12">
              <b-form-group v-if="ceps.length > 0" label="Quantidade por página">
                <b-form-select v-model="table.perPage" class="rounded-pill" size="sm" :options="table.pageOptions"/>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="d-flex m-3">
            <b-btn variant="success m-auto w-75" @click="onSubmit">Salvar</b-btn>
          </div>
        </b-overlay>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Cep from "../../../repositories/Cep";

export default {
  name: 'Index',
  computed: {
    ...mapGetters({
      bairros: 'cep/allBairros',
      ceps: 'cep/all',
      isLoading: 'cep/isLoading'
    }),
    prefixes() {
      if (this.ceps)
        return this.ceps.reduce((acc, cur) => {
          const prefix = cur.logradouro.split(' ')[0]
          return acc.includes(prefix) ? acc : [...acc, prefix]
        }, [])

      return []
    }
  },
  data() {
    return {
      filter: {
        available: 'available',
        text: '',
        oldText: ''
      },
      table: {
        checkFiltered: false,
        totalRows: 0,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 75, 100],
        fields: [
          {key: 'id', value: 'ID'},
          {key: 'taxa_entrega', value: 'Taxa de Entrega'},
          {key: 'vlr_minimo_pedido', value: 'vlr_minimo_pedido'},
          {key: 'logradouro', value: 'Logradouro'}
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'cep/listAll',
      'cep/listBairros',
    ]),
    async listCeps(evt) {
      const filters = this.filter.available === 'available' ? { bairro: evt, available: true } : { bairro: evt, attached: true }
      await this.$store.dispatch('cep/listAll', { filters })
      await this.$store.commit('cep/setAll', this.ceps.map(c => {
        return {...c, isChecked: false}
      }))
      this.table.totalRows = this.ceps.length
      this.filter.text = ''
      this.changeHeader('checkbox', false)
    },
    onFiltered(filteredItems) {
      this.table.totalRows = filteredItems.length

      // Se for só paginação não modifica nada
      if (this.filter.oldText !== this.filter.text) {
        this.changeHeader('checkbox', false)
        this.table.currentPage = 1
      }

      this.filter.oldText = this.filter.text
    },
    changeHeader(property, value) {
      if (property === 'checkbox') {
        // this.table.checkFiltered = value
        this.ceps.map(c => c.isChecked = false)

        if (value) {
          // Quando Não tem nada filtrado
          if (this.filter.text === '') {
            this.$notify({type: 'default', title: 'Filtre os CEPs', verticalAlign: 'bottom', horizontalAlign: 'center'})
            this.table.checkFiltered = false // NOT Working
          } else {
            this.ceps
              .filter(c => c.logradouro.toLowerCase().includes(this.filter.text.toLowerCase()))
              .map(c => c.isChecked = true)
          }
        }
      }
      if (property === 'taxa_entrega') {
        this.ceps
          .filter(c => c.isChecked)
          .map(c => c.taxa_entrega = value)
      }
      if (property === 'vlr_minimo_pedido') {
        this.ceps
          .filter(c => c.isChecked)
          .map(c => c.vlr_minimo_pedido = value)
      }
    },
    changeUnique(id, property, value) {
      if (property === 'checkbox') {
        this.ceps
          .filter(c => c.id === id)
          .map(c => c.isChecked = value)
      }
      if (property === 'taxa_entrega') {
        this.ceps
          .filter(c => c.id === id)
          .map(c => c.taxa_entrega = value)
      }
      if (property === 'vlr_minimo_pedido') {
        this.ceps
          .filter(c => c.id === id)
          .map(c => c.vlr_minimo_pedido = value)
      }
    },
    async onSubmit() {
      await this.$store.commit('cep/setLoading', true)
      await Cep.put(
        null,
        this.ceps.map(c => {
          return {id: c.id, taxa_entrega: c.taxa_entrega, vlr_minimo_pedido: c.vlr_minimo_pedido}
        })
      ).then(() => {
        this.$notify({
          type: 'success',
          title: 'Ceps Vinculados / Atualizados com Sucesso!',
          verticalAlign: 'bottom',
          horizontalAlign: 'center'
        })
      })
      this.$store.commit('cep/setLoading', false)
    }
  },
  mounted() {
    this.$store.commit('cep/setAll', [])
    this['cep/listBairros']()
  }
}
</script>

<style lang="scss" scoped>
select.rounded-pill:active {
  border-radius: 20px 20px 0 0 !important;
}

.form-control-plaintext {
  padding: 0 0.5rem;
}
</style>
