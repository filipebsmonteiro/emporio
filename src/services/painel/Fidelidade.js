import { Repository, createRepository } from '@/services/repository'

class FidelidadeRepository extends Repository {
  endpoint = 'painel/fidelidade'

}

export default new FidelidadeRepository()

export const create = createRepository(FidelidadeRepository)
