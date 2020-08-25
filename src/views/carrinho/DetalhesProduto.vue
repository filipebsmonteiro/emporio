<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="(detalhe, i) in detalhes" :key="i"
        class="d-flex justify-content-between align-items-center bg-transparent">
        <div class="d-flex justify-content-between align-items-center bg-transparent">
          <div class="text-left">
            <b>{{ detalhe.multiplo }}:</b>

            <!--  Combos  -->
            <p v-if="detalhe.produto" class="text-sm">
              {{detalhe.produto}}
              <span v-for="(combinacao, i) in detalhe.combinacoes" :key="i">
                <br>{{ `${combinacao.nome}` }}
              </span>
            </p>
          </div>

          <!--  SubIngredientes de Multiplos de Subprodutos  -->
          <ul class="list-unstyled ml-4 pl-2 border-left text-left">
            <li v-for="(detalhe, i) in detalhe.multiplos" :key="i">
              <b>{{ detalhe.multiplo }}:</b>
              <!--  Valores de SubIngredientes de Multiplos de Subprodutos  -->
              <span :class="{'mr-3': detalhe.valor > 0, 'mr-6': detalhe.valor === 0 }">
                {{ detalhe.quantidade > 1 ? detalhe.quantidade + ' - ' : null }}{{ detalhe.ingrediente }}
              </span>
              <span v-if="detalhe.valor > 0">{{ detalhe.valor | formatMoney }}</span>
            </li>
          </ul>

        </div>
        <div>
          <!--  Valores de SubIngredientes de Multiplos  -->
          <span :class="{'mr-3': detalhe.valor > 0, 'mr-6': detalhe.valor === 0 }">
            {{ detalhe.quantidade > 1 ? detalhe.quantidade + ' - ' : null }}{{ detalhe.ingrediente }}
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
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>
</style>
