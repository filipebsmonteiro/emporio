import { Repository, createRepository } from '@/repositories/Base/Repository'

class ClienteRepository extends Repository {
  endpoint = 'cliente'

}

export default new ClienteRepository()

export const create = createRepository(ClienteRepository)
