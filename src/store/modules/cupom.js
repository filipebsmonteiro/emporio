import CupomRepository from '@/services/Cupom'
import State from '@/store/References/State'
import Getters from '@/store/References/Getters'
import Mutations from '@/store/References/Mutations'
import ActionsClass from '@/store/References/ActionsClass'

const $actions = new ActionsClass(CupomRepository)

export default {
  name: 'cupom',
  namespaced: true,
  state: {
    ...Object.assign({}, State),
    tipos: []
  },
  getters: {
    ...Object.assign({}, Getters),
    getTipos (state) {
      return state.tipos
    }
  },
  mutations: {
    ...Object.assign({}, Mutations),
    setTipos (state, array) {
      state.tipos = array
    }
  },
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
