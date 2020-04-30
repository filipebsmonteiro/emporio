import { Repository, createRepository } from './repository'

class ClienteRepository extends Repository {
  endpoint = 'cliente'

}

export default new ClienteRepository()

export const create = createRepository(ClienteRepository)
