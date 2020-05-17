import { Repository, createRepository } from '@/services/repository'

class ClienteRepository extends Repository {
  endpoint = 'painel/cliente'

}

export default new ClienteRepository()

export const create = createRepository(ClienteRepository)
