import { Repository, createRepository } from './repository'

class ProdutoRepository extends Repository {
  endpoint = 'produto'

}

export default new ProdutoRepository()

export const create = createRepository(ProdutoRepository)
