import Vue from 'vue'
import Vuex from 'vuex'

import mainbar from './modules/mainbar'
import cliente from './modules/cliente'
import cupom from './modules/cupom'
import dashboard from './modules/dashboard'
import endereco from './modules/endereco'
import fidelidade from './modules/fidelidade'
import formapagamento from './modules/formapagamento'
import ingrediente from './modules/ingrediente'
import loja from './modules/loja'
import pedido from './modules/pedido'
import produto from './modules/produto/produto'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mainbar,
    cliente,
    cupom,
    dashboard,
    endereco,
    fidelidade,
    formapagamento,
    ingrediente,
    loja,
    pedido,
    produto,
  }
})
