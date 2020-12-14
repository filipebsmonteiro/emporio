import CepRepository from '@/repositories/Cep'
import makeStore from '@/storages/Base/Storage'

let store = makeStore('cep', CepRepository)

store.state = {
  ...store.state,
  bairroList: []
}

store.getters = {
  ...store.getters,
  allBairros (state) {
    return state.bairroList
  }
}

store.mutations = {
  ...store.mutations,
  setAllBairros (state, array) {
    state.bairroList = array
  }
}

store.actions = {
  ...store.actions,
  // eslint-disable-next-line no-unused-vars
  // async listAll ({ commit }, params) {
    // eslint-disable-next-line no-console
    // console.log(params)
  // },
  async listBairros ({ commit }) {
    commit('setLoading', true)
    await CepRepository.fetchAllBairros().then(response => {
      commit('setAllBairros', response.data)
    })
    commit('setLoading', false)
  }
}

export default store
