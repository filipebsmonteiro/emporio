import ClienteRepository from '@/services/Cliente.js'
import Auth from '@/services/Auth'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(ClienteRepository)

export default {
  name: 'cliente',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: {
    ...$actions.classToObject(),
    async listMe ({ commit }) {
      commit('setLoading', true)
      await Auth.me().then(response => {
        commit('setCurrent', response.data)
      })
      commit('setLoading', false)
    },
  }
}
