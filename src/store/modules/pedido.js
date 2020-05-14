import PedidoRepository from '@/services/Pedido.js'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(PedidoRepository)

export default {
  name: 'pedido',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
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
