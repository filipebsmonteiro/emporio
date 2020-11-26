<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(detalhe, i) in detalhes" :key="i"
        class="d-flex justify-content-between align-items-center bg-transparent">
        <b>{{ detalhe.multiplo.nome }}:</b>
        <div>
          <span :class="{'mr-3': detalhe.valor > 0, 'mr-6': detalhe.valor === 0 }">
            {{ detalhe.quantidade > 1 ? detalhe.quantidade + ' - ' : null }}{{ detalhe.ingrediente.nome }}
          </span>
          <span v-if="detalhe.valor > 0">{{ detalhe.valor | formatMoney }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: 'DetalhesProduto',
    props: {
      detalhes: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style scoped>
</style>
