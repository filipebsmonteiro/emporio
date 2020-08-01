import ClienteRepository from '@/repositories/Cliente'
import Auth from '@/repositories/Auth'
import makeStore from '@/storages/Base/Storage'

let store = makeStore('cliente', ClienteRepository)

store.actions = {
  ...store.actions,
  async listMe ({ commit }) {
    commit('setLoading', true)
    await Auth.me().then(response => {
      commit('setCurrent', response.data)
    })
    commit('setLoading', false)
  }
}

export default store
