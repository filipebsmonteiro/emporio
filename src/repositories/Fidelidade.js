import { Repository, createRepository } from '@/repositories/Base/Repository'

class FidelidadeRepository extends Repository {
  endpoint = 'fidelidade'

}

export default new FidelidadeRepository()

export const create = createRepository(FidelidadeRepository)
