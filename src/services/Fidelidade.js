import { Repository, createRepository } from './repository'

class FidelidadeRepository extends Repository {
  endpoint = 'fidelidade'

}

export default new FidelidadeRepository()

export const create = createRepository(FidelidadeRepository)
