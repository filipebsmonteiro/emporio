import EnderecoRepository from '@/services/Endereco.js'
import State from '@/store/References/State'
import Getters from '@/store/References/Getters'
import Mutations from '@/store/References/Mutations'
import ActionsClass from '@/store/References/ActionsClass'

const $actions = new ActionsClass(EnderecoRepository)

export default {
  name: 'endereco',
  namespaced: true,
  state: Object.assign({}, State),
  getters: Object.assign({}, Getters),
  mutations: Object.assign({}, Mutations),
  actions: {
    ...$actions.classToObject(),
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
