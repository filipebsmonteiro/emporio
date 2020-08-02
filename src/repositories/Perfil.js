import { Repository, createRepository } from '@/repositories/Base/Repository'

class PerfilRepository extends Repository {
  endpoint = 'perfil'

}

export default new PerfilRepository()

export const create = createRepository(PerfilRepository)
