import { Repository, createRepository } from './repository'

class CupomRepository extends Repository {
  endpoint = 'cupom'

}

export default new CupomRepository()

export const create = createRepository(CupomRepository)
