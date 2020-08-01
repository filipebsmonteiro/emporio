import { Repository, createRepository } from '@/repositories/Base/Repository'

class ProdutoRepository extends Repository {
  endpoint = 'produto'

  changeStatus (id, params) {
    return this.$axios.put(`${this.endpoint}/changeStatus/${id}`, params)
  }

  uploadImagem (formData) {
    return this.$axios.post(`${this.endpoint}/uploadImagem`, formData)
  }
}

export default new ProdutoRepository()

export const create = createRepository(ProdutoRepository)
