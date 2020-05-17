import { Repository, createRepository } from '@/services/repository'

class LojaRepository extends Repository {
  endpoint = 'painel/loja'

}

export default new LojaRepository()

export const create = createRepository(LojaRepository)
