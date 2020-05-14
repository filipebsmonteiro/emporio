import IngredienteRepository from '@/services/Ingrediente.js'
import State from '@/store/Classes/State'
import Getters from '@/store/Classes/Getters'
import Mutations from '@/store/Classes/Mutations'
import ActionsClass from '@/store/Classes/ActionsClass'

const $actions = new ActionsClass(IngredienteRepository)

export default {
  name: 'ingrediente',
  namespaced: true,
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: $actions.classToObject()
}
