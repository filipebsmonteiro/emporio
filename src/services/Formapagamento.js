import { Repository, createRepository } from './repository'

class FormapagamentoRepository extends Repository {
  endpoint = 'formapagamento'

}

export default new FormapagamentoRepository()

export const create = createRepository(FormapagamentoRepository)
