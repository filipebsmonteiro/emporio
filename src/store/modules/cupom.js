import CupomRepository from '@/services/Cupom.js'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(CupomRepository)

export default {
  name: 'cupom',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: {
    ...$actions.classToObject(),
    async listTipos ({ commit }, params) {
      commit('setLoading', true)
      await CupomRepository.fetchTipos(params).then(response => {
        commit('setTipos', response.data)
      })
      commit('setLoading', false)
    }
  }
}
