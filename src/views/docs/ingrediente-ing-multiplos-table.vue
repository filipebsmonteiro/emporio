<template>
  <div>
    <li v-b-toggle.accordion-ingrediente_ing_multiplos>ingrediente_ing_multiplos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-ingrediente_ing_multiplos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>Ingredientes_idIngredientes</li>
        <li>Multiplos_idMultiplos</li>
        <li>valor</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'ingrediente-ing-multiplos-table'
  }
</script>

<style scoped>

</style>
