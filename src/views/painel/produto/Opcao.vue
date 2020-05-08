<template>
  <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
    <slot :name="slotName" v-bind="slotScope" />
  </template>
</template>

<script>
  export default {
    name: 'Opcao'
  }
</script>

<style scoped>

</style>
