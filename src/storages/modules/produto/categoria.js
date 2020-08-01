import CategoriaRepository from '@/repositories/Produto/Categoria'
import makeStore from '@/storages/Base/Storage'

let store = makeStore('categoria', CategoriaRepository)

store.actions = {
  ...store.actions,
  async listAvailable ({commit}, params) {
    commit('setLoading', true)
    await CategoriaRepository.fetchAvailable(params).then(response => {
      commit('setAll', response.data)
    })
    commit('setLoading', false)
  }
}

export default store
