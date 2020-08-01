import { Repository, createRepository } from '@/repositories/Base/Repository'

class CategoriaRepository extends Repository {
  endpoint = 'produto/categoria'

  fetchAvailable (params) {
    return this.$axios.get(`${this.endpoint}/listAvailable`, { params })
  }
}

export default new CategoriaRepository()

export const create = createRepository(CategoriaRepository)
