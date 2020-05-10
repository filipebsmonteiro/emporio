import CupomRepository from '@/services/Cupom.js'

export default {
  name: 'cupom',
  namespaced: true,
  state: {
    list: [],
    tipos: [],
    current: {},
    isLoading: false
  },
  getters: {
    getAll (state) {
      return state.list
    },
    getTipos (state) {
      return state.tipos
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
    setTipos (state, array) {
      state.tipos = array
    },
    setLoading (state, boolean) {
      state.isLoading = boolean
    }
  },
  actions: {
    async listOne ({ commit }, id) {
      commit('setLoading', true)
      await CupomRepository.fetch(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await CupomRepository.fetchAll(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    },
    async listTipos ({ commit }, params) {
      commit('setLoading', true)
      await CupomRepository.fetchTipos(params).then(response => {
        commit('setTipos', response.data)
      })
      commit('setLoading', false)
    }
  }
}
