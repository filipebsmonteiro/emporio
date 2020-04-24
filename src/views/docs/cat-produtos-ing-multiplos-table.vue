<template>
  <div>
    <li v-b-toggle.accordion-cat_produtos_ing_multiplos>cat_produtos_ing_multiplos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-cat_produtos_ing_multiplos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>Cat_produtos_idCat_produtos</li>
        <li>Multiplos_idMultiplos</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'cat-produtos-ing-multiplos-table'
  }
</script>

<style scoped>

</style>
