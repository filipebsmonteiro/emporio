import ProdutoRepository from '@/services/Produto/Produto'
import categoria from '@/store/modules/produto/categoria'

export default {
  name: 'produto',
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
    async listOnePainel ({ commit }, id) {
      commit('setLoading', true)
      await ProdutoRepository.fetchPainel(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listOne ({ commit }, id) {
      commit('setLoading', true)
      await ProdutoRepository.fetch(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await ProdutoRepository.fetchAll(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    }
  },
  modules: {
    categoria
  }
}
