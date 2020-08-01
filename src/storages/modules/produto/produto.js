import ProdutoRepository from '@/repositories/Produto/Produto'
import categoria from '@/storages/modules/produto/categoria'
import makeStore from '@/storages/Base/Storage'

const store = makeStore('produto', ProdutoRepository)

export default {
  ...store,
  modules: {
    categoria
  }
}
