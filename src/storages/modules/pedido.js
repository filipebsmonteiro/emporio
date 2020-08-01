import PedidoRepository from '@/repositories/Pedido'
import makeStore from '@/storages/Base/Storage'

let store = makeStore('pedido', PedidoRepository)

store.actions = {
  ...store.actions,
  async listAllPainel ({ commit }, params) {
    commit('setLoading', true)
    await PedidoRepository.fetchAllPainel(params).then(response => {
      commit('setAll', response.data)
    })
    commit('setLoading', false)
  }
}

export default store
