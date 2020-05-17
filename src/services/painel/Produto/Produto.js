import { Repository, createRepository } from '@/services/repository'

class ProdutoRepository extends Repository {
  endpoint = 'painel/produto'

  changeStatus(id, params) {
    return this.$axios.put(`${this.endpoint}/changeStatus/${id}`, params)
  }
}

export default new ProdutoRepository()

export const create = createRepository(ProdutoRepository)
