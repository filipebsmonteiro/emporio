<template>
  <div>
    <li v-b-toggle.accordion-ing_multiplos_produtos>ing_multiplos_produtos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-ing_multiplos_produtos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>Produtos_idProdutos</li>
        <li>Multiplos_idMultiplos</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'ing-multiplos-produtos-table'
  }
</script>

<style scoped>

</style>
