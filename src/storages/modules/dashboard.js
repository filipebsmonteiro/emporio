import DashboardRepository from '@/repositories/Dashboard'

export default {
  name: 'dashboard',
  namespaced: true,
  state: {
    list: [],
    cards: {
      abertos: 0,
      confirmados: 0,
      enviados: 0,
      cancelados: 0,
      faturamento: 0,
      media_valor: 0,
      media_entrega: 0,
    },
    isLoading: false
  },
  getters: {
    all (state) {
      return state.list
    },
    isLoading (state) {
      return state.isLoading
    },
    getCards (state) {
      return state.cards
    }
  },
  mutations: {
    setCards (state, obj) {
      state.cards = obj
    },
    setAll (state, array) {
      state.list = array
    },
    setLoading (state, boolean) {
      state.isLoading = boolean
    }
  },
  actions: {
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await DashboardRepository.fetchQuantidade(params).then(response => {
        commit('setAll', response.data)
      })
      await DashboardRepository.fetchCards(params).then(response => {
        commit('setCards', response.data)
      })
      commit('setLoading', false)
    }
  }
}
