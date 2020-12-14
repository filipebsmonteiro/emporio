import Vue from 'vue'
import Vuex from 'vuex'

import mainbar from '@/storages/modules/mainbar'
import cep from '@/storages/modules/cep'
import cliente from '@/storages/modules/cliente'
import cupom from '@/storages/modules/cupom'
import dashboard from '@/storages/modules/dashboard'
import endereco from '@/storages/modules/endereco'
import fidelidade from '@/storages/modules/fidelidade'
import formapagamento from '@/storages/modules/formapagamento'
import ingrediente from '@/storages/modules/ingrediente'
import loja from '@/storages/modules/loja'
import pedido from '@/storages/modules/pedido'
import perfil from '@/storages/modules/perfil'
import produto from '@/storages/modules/produto/produto'
import usuario from '@/storages/modules/usuario'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mainbar,
    cep,
    cliente,
    cupom,
    dashboard,
    endereco,
    fidelidade,
    formapagamento,
    ingrediente,
    loja,
    pedido,
    perfil,
    produto,
    usuario
  }
})
