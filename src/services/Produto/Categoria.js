import { Repository, createRepository } from '../repository'

class CategoriaRepository extends Repository {
  endpoint = 'produto/categoria'

}

export default new CategoriaRepository()

export const create = createRepository(CategoriaRepository)
