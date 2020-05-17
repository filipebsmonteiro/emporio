import { Repository, createRepository } from '@/services/repository'

class FormapagamentoRepository extends Repository {
  endpoint = 'painel/formapagamento'

}

export default new FormapagamentoRepository()

export const create = createRepository(FormapagamentoRepository)
