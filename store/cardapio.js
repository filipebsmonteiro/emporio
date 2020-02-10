export const state = () => ({
  categorias: {
    list: []
  },
  produtos: {
    perLine: 4,
    list: []
  }
})

export const getters = {
  getCategorias:
    (state) => {
      return state.categorias.list
    },
  getProdutos:
    (state) => {
      return state.produtos.list
    },
  getProdutosPerLine:
    (state) => {
      return state.produtos.perLine
    }
}

// Mutations modificam o estado
export const mutations = {
  addProdutos (state, produtos) {
    state.produtos.list = produtos
  },
  addCategorias (state, categorias) {
    // state.list.push(produto)
    state.categorias.list = categorias
  },
  remove (state, { produto }) {
    state.list.splice(state.list.indexOf(produto), 1)
  }
}

// Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
export const actions = {
  async listCategorias ({ commit, state }) {
    await this.$repositories.cardapio.getCategories()
      .then((response) => {
        commit('addCategorias', response.data)
      }
      )
  },
  async listProdutos ({ commit, state }, idCategoria) {
    await this.$repositories.cardapio.getProducts(idCategoria)
      .then((response) => {
        commit('addProdutos', response.data)
      }
      )
  }
}
