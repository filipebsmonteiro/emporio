import PedidoRepository from '@/services/Pedido'
import State from '@/store/References/State'
import Getters from '@/store/References/Getters'
import Mutations from '@/store/References/Mutations'
import ActionsClass from '@/store/References/ActionsClass'

const $actions = new ActionsClass(PedidoRepository)

export default {
  name: 'pedido',
  namespaced: true,
  state: Object.assign({}, State),
  getters: Object.assign({}, Getters),
  mutations: Object.assign({}, Mutations),
  actions: {
    ...$actions.classToObject(),
    async listAllPainel ({ commit }, params) {
      commit('setLoading', true)
      await PedidoRepository.fetchAllPainel(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    }
  }
}
