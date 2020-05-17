import APIService from '@/api/APIService'

export default {
  name: 'mainbar',
  namespaced: true,
  state: {
    quantidade: null,
    isLogged: false
  },
  getters: {
    isLogged (state) {
      return state.isLogged
    },
    getQuantidade (state) {
      return state.quantidade
    }
  },
  mutations: {
    setLogged (state, boolean) {
      state.isLogged = boolean
    },
    setQuantidade (state, quantidade) {
      state.quantidade = quantidade
    }
  },
  actions: {
    setQuantidade ({ commit }, quantidade) {
      commit('setQuantidade', quantidade)
    },
    checkLogged ({ commit }) {
      if (APIService._getToken()){
        commit('setLogged', true)
        return
      }
      commit('setLogged', false)
    }
  }
}
