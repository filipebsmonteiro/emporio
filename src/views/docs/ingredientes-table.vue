<template>
  <div>
    <li v-b-toggle.accordion-ingredientes>ingredientes <i class="fa fa-caret-down ml-1" /></li>
    <b-collapse id="accordion-ingredientes" accordion="my-accordion" role="tabpanel">
      <ul>
        <li>status</li>
        <li>preco</li>
        <li>PDV</li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: 'ingredientes-table'
  }
</script>

<style scoped>

</style>
