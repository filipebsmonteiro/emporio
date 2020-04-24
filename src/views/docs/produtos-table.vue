<template>
  <div>
    <li v-b-toggle.accordion-produtos>produtos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-produtos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>promocionar</li>
        <li>valorPromocao</li>
        <li>Cat_produtos_idCat_produtos</li>
        <li>tempo_producao</li>
        <li>unidade_medida</li>
        <li>minimo_unidade</li>
        <li>intervalo</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'produtos-table'
  }
</script>

<style scoped>

</style>
