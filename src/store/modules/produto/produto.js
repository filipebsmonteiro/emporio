import ProdutoRepository from '@/services/Produto/Produto'
import categoria from '@/store/modules/produto/categoria'
import State from '@/store/References/State'
import Getters from '@/store/References/Getters'
import Mutations from '@/store/References/Mutations'
import ActionsClass from '@/store/References/ActionsClass'

const $actions = new ActionsClass(ProdutoRepository)

export default {
  name: 'produto',
  namespaced: true,
  state: Object.assign({}, State),
  getters: Object.assign({}, Getters),
  mutations: Object.assign({}, Mutations),
  actions: $actions.classToObject(),
  modules: {
    categoria
  }
}
