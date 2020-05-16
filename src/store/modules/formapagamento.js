import FormapagamentoRepository from '@/services/Formapagamento.js'
import State from '@/store/References/State'
import Getters from '@/store/References/Getters'
import Mutations from '@/store/References/Mutations'
import ActionsClass from '@/store/References/ActionsClass'

const $actions = new ActionsClass(FormapagamentoRepository)

export default {
  name: 'formapagamento',
  namespaced: true,
  state: Object.assign({}, State),
  getters: Object.assign({}, Getters),
  mutations: Object.assign({}, Mutations),
  actions: $actions.classToObject()
}
