<template>
  <div class="container">
    <b-table :items="enderecos">
      <template v-slot:cell(id)>
        <base-button
          size="sm"
          type="primary"
          icon="fas fa-eye fa-2x"
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
