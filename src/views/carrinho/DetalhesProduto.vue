<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(mult, i) in produto.multiplos" :key="i"
        class="d-flex justify-content-between align-items-center bg-transparent">
        {{ mult.multiplo.nome }}:
        {{ mult.quantidade > 1 ? mult.quantidade + ' - ' : null }}{{ mult.ingrediente.nome }}
        <span v-if="mult.valor > 0">{{ mult.valor | formatMoney }}</span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: 'DetalhesProduto',
    props: {
      produto: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style scoped>

</style>
