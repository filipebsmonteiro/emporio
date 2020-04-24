<template>
  <div>
    <li v-b-toggle.accordion-ingrediente-multiplos>ingrediente-multiplos <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-ingrediente-multiplos" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>valor</li>
        <li>obrigatorio</li>
        <li>quantidade_min</li>
        <li>quantidade_max</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'ingrediente-multiplos-table'
  }
</script>

<style scoped>

</style>
