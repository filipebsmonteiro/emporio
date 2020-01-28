import { Repository, createRepository } from './repository'

class CardapioRepository extends Repository {
  endpoint = 'v1/cardapio'
}

export default createRepository(CardapioRepository)
