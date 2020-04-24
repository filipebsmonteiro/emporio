<template>
  <div>
    <li v-b-toggle.accordion-categoria_produtos>categoria_produtos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-categoria_produtos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>grupo</li>
        <li>layout</li>
        <li>permiteCombinacao</li>
        <li>quantidadeCombinacoes</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'categoria-produtos-table'
  }
</script>

<style scoped>

</style>
