<template>
  <b-table :fields="fields" :items="ingredientes" responsive>
    <template v-slot:cell(visibilidade)="{ item: { id, nome } }">
      <b-input-group class="align-items-center">
        <b-form-select size="sm"
                       :options="['Ingrediente', 'Essencial Visível', 'Essencial Não Visível']"
                       @change="evt => $emit('update', { id, nome, visibilidade: evt })"/>
      </b-input-group>
    </template>
    <template v-slot:cell(id)="{ item: { id } }">
      <i class="fas fa-times m-auto btn p-0 text-danger" @click="$emit('remove', id)"/>
    </template>
  </b-table>
</template>

<script>
  export default {
    name: 'IngredienteList',
    props: {
      ingredientes: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        fields: [
          'nome',
          'visibilidade',
          { key: 'id', label: '' }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-opcao {
    background-color: transparent;
    border-color: transparent;
    color: #525f7f;
    padding: 0 !important;
    width: 7rem;

    &:hover, &:focus {
      border-color: #f7fafc !important;
    }
  }
</style>
