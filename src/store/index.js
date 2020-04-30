import Vue from 'vue'
import Vuex from 'vuex'

import carrinho from './modules/carrinho'
import cliente from './modules/cliente'
import cupom from './modules/cupom'
import endereco from './modules/endereco'
import fidelidade from './modules/fidelidade'
import formapagamento from './modules/formapagamento'
import ingrediente from './modules/ingrediente'
import loja from './modules/loja'
import pedido from './modules/pedido'
import produto from './modules/produto/produto'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    carrinho,
    cliente,
    cupom,
    endereco,
    fidelidade,
    formapagamento,
    ingrediente,
    loja,
    pedido,
    produto,
  }
})
