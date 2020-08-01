import { Repository, createRepository } from '@/repositories/Base/Repository'

class FormapagamentoRepository extends Repository {
  endpoint = 'formapagamento'

}

export default new FormapagamentoRepository()

export const create = createRepository(FormapagamentoRepository)
