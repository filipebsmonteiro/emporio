<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="card">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Lista de Cupons</h3>
            </div>
            <div class="col text-right">
              <router-link :to="{ name: 'painel.cupom.create' }" class="btn btn-primary">Novo</router-link>
            </div>
          </div>
        </div>

        <b-table :items="cupons" :fields="fields">
          <template v-slot:cell(codigo)="{ item: { codigo, hash, numerador } }">
            {{ `${codigo}-${hash || numerador}` }}
          </template>
          <template v-slot:cell(valor)="{ item: { valor, porcentagem } }">
            {{ valor | formatMoney }}
            {{ porcentagem ? `${porcentagem}%` : null }}
          </template>
          <template v-slot:cell(id)="{ item: { id } }">
            <router-link class="btn btn-link btn-sm p-0" :to="{ name: 'painel.cupom.edit', params: { id } }">
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
        cupons: 'cupom/getAll'
      })
    },
    data() {
      return {
        fields: [
          { key: 'codigo', label: 'Código' },
          { key: 'quantidade', label: 'Quantidade' },
          { key: 'valor', label: 'Valor' },
          { key: 'id', label: 'Editar' }
        ]
      }
    },
    methods: {
      ...mapActions([
        'cupom/listAll'
      ])
    },
    mounted() {
      this['cupom/listAll']()
    }
  }
</script>
<style lang="scss" scoped>
</style>
