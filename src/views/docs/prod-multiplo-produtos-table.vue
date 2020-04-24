<template>
  <div>
    <li v-b-toggle.accordion-prod_multiplo_produtos>prod_multiplo_produtos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-prod_multiplo_produtos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>Prod_Multiplos_idProd_Multiplos</li>
        <li>Produtos_idProdutos</li>
        <li>Cat_produtos_idCat_produtos</li>
        <li>valor</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'prod-multiplo-produtos-table'
  }
</script>

<style scoped>

</style>
