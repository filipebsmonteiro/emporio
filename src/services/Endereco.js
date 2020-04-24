import { Repository, createRepository } from './repository'

class EnderecoRepository extends Repository {
  endpoint = 'endereco'

}

export default new EnderecoRepository()

export const create = createRepository(EnderecoRepository)
