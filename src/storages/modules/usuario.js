import UsuarioRepository from '@/repositories/Usuario'
import Auth from "@/repositories/Auth";
import makeStore from '@/storages/Base/Storage'

const store = makeStore('usuario', UsuarioRepository)
store.actions = {
  ...store.actions,
  async listMe({commit}) {
    commit('setLoading', true)
    await Auth.me().then(response => {
      commit('setCurrent', response.data)
    })
    commit('setLoading', false)
  }
}

export default store
