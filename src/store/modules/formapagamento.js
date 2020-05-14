import FormapagamentoRepository from '@/services/Formapagamento.js'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(FormapagamentoRepository)

export default {
  name: 'formapagamento',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: $actions.classToObject()
}
