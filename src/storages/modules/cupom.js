import CupomRepository from '@/repositories/Cupom'
import makeState from '@/storages/Base/State'
import makeGetters from '@/storages/Base/Getters'
import makeMutations from '@/storages/Base/Mutations'
import makeActions from '@/storages/Base/Actions'

export default {
  name: 'cupom',
  namespaced: true,
  state: {
    ...makeState(),
    tipos: []
  },
  getters: {
    ...makeGetters(),
    getTipos (state) {
      return state.tipos
    }
  },
  mutations: {
    ...makeMutations(),
    setTipos (state, array) {
      state.tipos = array
    }
  },
  actions: {
    ...makeActions(CupomRepository),
    async listTipos ({ commit }, params) {
      commit('setLoading', true)
      await CupomRepository.fetchTipos(params).then(response => {
        commit('setTipos', response.data)
      })
      commit('setLoading', false)
    }
  }
}
