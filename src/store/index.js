import Vue from 'vue'
import Vuex from 'vuex'

import cupom from './modules/cupom'
import endereco from './modules/endereco'
import fidelidade from './modules/fidelidade'
import ingrediente from './modules/ingrediente'
import loja from './modules/loja'
import produto from './modules/produto/produto'
import formapagamento from './modules/formapagamento'
import pedido from './modules/pedido'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    cupom,
    endereco,
    fidelidade,
    ingrediente,
    loja,
    produto,
    formapagamento,
    pedido
  }
})