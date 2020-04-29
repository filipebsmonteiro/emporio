//import CarrinhoRepository from '@/services/Carrinho.js'
class a {}
const CarrinhoRepository = new a()

export default {
  name: 'carrinho',
  namespaced: true,
  state: {
    list: [],
    current: {},
    quantidade: null,
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
    },
    getQuantidade (state) {
      return state.quantidade
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
    },
    setQuantidade (state, quantidade) {
      state.quantidade = quantidade
    }
  },
  actions: {
    setQuantidade ({ commit }, quantidade) {
      commit('setQuantidade', quantidade)
    },
    async listOne ({ commit }, id) {
      commit('setLoading', true)
      await CarrinhoRepository.fetch(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await CarrinhoRepository.fetchAll(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    }
  }
}
