import { Repository, createRepository } from '@/services/repository'

class CategoriaRepository extends Repository {
  endpoint = 'painel/produto/categoria'

}

export default new CategoriaRepository()

export const create = createRepository(CategoriaRepository)
