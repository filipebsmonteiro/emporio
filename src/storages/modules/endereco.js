import EnderecoRepository from '@/repositories/Endereco'

import makeStore from '@/storages/Base/Storage'

let store = makeStore('endereco', EnderecoRepository)

store.actions = {
  ...store.actions,
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

export default store
