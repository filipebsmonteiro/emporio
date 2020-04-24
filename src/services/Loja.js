import { Repository, createRepository } from './repository'

class LojaRepository extends Repository {
  endpoint = 'loja'

}

export default new LojaRepository()

export const create = createRepository(LojaRepository)
