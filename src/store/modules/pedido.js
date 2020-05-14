import PedidoRepository from '@/services/Pedido.js'

export default {
  name: 'pedido',
  namespaced: true,
  state: {
    list: [],
    pagination: {
      page: 1,
      per_page: 10,
      total: 0
    },
    current: {},
    isLoading: false
  },
  getters: {
    getAll (state) {
      return state.list
    },
    pagination (state) {
      return state.pagination
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
    setPagination (state, obj) {
      const newObj = {
        per_page: obj.per_page,
        page: obj.page,
        total: obj.total
      }
      state.pagination = newObj
    },
    setLoading (state, boolean) {
      state.isLoading = boolean
    }
  },
  actions: {
    async listOne ({ commit }, id) {
      commit('setLoading', true)
      await PedidoRepository.fetch(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await PedidoRepository.fetchAll(params).then(response => {
        if (response.data.meta) {
          commit('setAll', response.data.data)
          commit('setPagination', response.data.meta)
          return
        }
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    },
    async listAllPainel ({ commit }, params) {
      commit('setLoading', true)
      await PedidoRepository.fetchAllPainel(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    }
  }
}
