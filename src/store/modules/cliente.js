import ClienteRepository from '@/services/Cliente.js'
import Auth from '@/services/Auth'

export default {
  name: 'cliente',
  namespaced: true,
  state: {
    list: [],
    current: {},
    isLoading: false
  },
  getters: {
    getAll (state) {
      return state.list
    },
    isLoading (state) {
      return state.isLoading
    },
    getCurrent (state) {
      return state.current
    }
  },
  mutations: {
    setCurrent (state, obj) {
      state.current = obj
    },
    setAll (state, array) {
      state.list = array
    },
    setLoading (state, boolean) {
      state.isLoading = boolean
    }
  },
  actions: {
    async listMe ({ commit }) {
      commit('setLoading', true)
      await Auth.me().then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listOne ({ commit }, id) {
      commit('setLoading', true)
      await ClienteRepository.fetch(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await ClienteRepository.fetchAll(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    }
  }
}
