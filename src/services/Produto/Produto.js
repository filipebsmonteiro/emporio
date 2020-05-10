import { Repository, createRepository } from '../repository'

class ProdutoRepository extends Repository {
  endpoint = 'produto'

  fetchPainel (id) {
      return this.$axios.get(`${this.endpoint}/painel/${id}`)
  }

  changeStatus(id, params) {
    return this.$axios.put(`${this.endpoint}/changeStatus/${id}`, params)
  }
}

export default new ProdutoRepository()

export const create = createRepository(ProdutoRepository)
