<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Produto com Ingredientes Simples</h1>
        <ul>
          <produtos-table/>
          <ingredientes-table/>
          <li>ingrediente_produtos</li>
          <ul>
            <li>Produtos_idProdutos</li>
            <li>Ingredientes_idIngredientes</li>
            <li>visibilidade</li>
            <ul>
              <li>Ingrediente</li>
              <li>Essencial Visível</li>
              <li>Essencial Não Visível</li>
            </ul>
          </ul>
        </ul>
      </div>
      <div class="col">
        <h1>Produto com Ingredientes Múltiplos</h1>
        <ul>
          <produtos-table/>
          <ing-multiplos-produtos-table/>
          <ingrediente-multiplos-table/>
          <ingrediente-ing-multiplos-table/>
          <ingredientes-table/>
        </ul>
      </div>
      <div class="col">
        <h1>Categoria de Produto com Ingredientes Múltiplos</h1>
        <ul>
          <categoria-produtos-table/>
          <cat-produtos-ing-multiplos-table/>
          <ingrediente-multiplos-table/>
          <ingrediente-ing-multiplos-table/>
          <ingredientes-table/>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1>Categoria de Produto com Produtos Múltiplos</h1>
        <ul>
          <categoria-produtos-table/>

        </ul>
        prod_multiplo_produtos
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
  import ProdutosTable from '@/views/docs/produtos-table'
  import IngredientesTable from '@/views/docs/ingredientes-table'
  import IngredienteMultiplosTable from '@/views/docs/ingrediente-multiplos-table'
  import IngMultiplosProdutosTable from '@/views/docs/ing-multiplos-produtos-table'
  import IngredienteIngMultiplosTable from '@/views/docs/ingrediente-ing-multiplos-table'
  import CategoriaProdutosTable from '@/views/docs/categoria-produtos-table'
  import CatProdutosIngMultiplosTable from '@/views/docs/cat-produtos-ing-multiplos-table'

  export default {
    name: 'Index',
    components: {
      CatProdutosIngMultiplosTable,
      CategoriaProdutosTable,
      IngredienteIngMultiplosTable,
      IngMultiplosProdutosTable,
      IngredienteMultiplosTable,
      IngredientesTable,
      ProdutosTable
    }
  }
</script>

<style scoped>

</style>
