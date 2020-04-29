<template>
  <div class="container">
    <b-table :fields="fields" :items="enderecos" responsive>
      <template v-slot:cell(id)>
        <base-button
          size="sm"
          type="link"
          icon="fas fa-edit fa-2x"
          @click="$router.push({ name: 'endereco.editar', params: {id: 1} })"
          icon-only
        />
      </template>
    </b-table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Index',
    computed: {
      ...mapGetters({
        enderecos: 'endereco/getAll'
      })
    },
    data() {
      return {
        fields: [
          { key: 'Logradouro', label: 'Logradouro' },
          { key: 'Bairro', label: 'Bairro' },
          { key: 'Cidade', label: 'Cidade' },
          { key: 'Referencia', label: 'Referencia' },
          { key: 'id', label: 'Editar' },
        ]
      }
    },
    methods: {
      ...mapActions([
        'endereco/listAll'
      ])
    },
    mounted () {
      this['endereco/listAll']()
    }
  }
</script>

<style lang="scss" scoped>
</style>
