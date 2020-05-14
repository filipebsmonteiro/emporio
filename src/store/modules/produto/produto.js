import ProdutoRepository from '@/services/Produto/Produto'
import categoria from '@/store/modules/produto/categoria'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(ProdutoRepository)

export default {
  name: 'produto',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: $actions.classToObject(),
  modules: {
    categoria
  }
}
