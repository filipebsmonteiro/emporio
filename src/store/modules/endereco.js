import EnderecoRepository from '@/services/Endereco.js'

export default {
  name: 'endereco',
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
    async listOne ({ commit }, id) {
      commit('setLoading', true)
      await EnderecoRepository.fetch(id).then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
    async listAll ({ commit }, params) {
      commit('setLoading', true)
      await EnderecoRepository.fetchAll(params).then(response => {
        commit('setAll', response.data)
      })
      commit('setLoading', false)
    },
    async listResponsavel ({ commit }, { CEP, vm }) {
      commit('setLoading', true)
      await EnderecoRepository.fetchLojaResponsavel(CEP).then(response => {
        commit('loja/setCurrent', response.data, { root: true })
      }).catch(erro => {
        vm.$notify({
          type: 'danger',
          title: `Erro ao Selecionar!`,
          message: erro.response.data.message,
          verticalAlign: 'bottom',
          horizontalAlign: 'center'
        })
      })
      commit('setLoading', false)
    }
  }
}
