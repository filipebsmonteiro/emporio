export const state = () => ({
  produtos: {
    list: []
  }
})

export const getters = {
  get:
    (state) => {
      return state.user
    }
}

// Mutations modificam o estado
export const mutations = {
  addAll (state, produtos) {
    state.produtos.list = produtos
  },
  add (state, produto) {
    state.list.push(produto)
  },
  remove (state, { produto }) {
    state.list.splice(state.list.indexOf(produto), 1)
  }
}

// Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
export const actions = {
  async list ({ commit, state }, params) {
    await this.$repositories.cardapio.fetchAll(params)
      .then((response) => {
        const produtos = response.data
        commit('addAll', produtos)
      }
      )
  }
}
