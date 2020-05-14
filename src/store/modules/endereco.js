import EnderecoRepository from '@/services/Endereco.js'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(EnderecoRepository)

export default {
  name: 'endereco',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
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
