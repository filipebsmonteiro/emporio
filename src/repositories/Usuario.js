import { Repository, createRepository } from '@/repositories/Base/Repository'

class UsuarioRepository extends Repository {
  endpoint = 'usuario'

}

export default new UsuarioRepository()

export const create = createRepository(UsuarioRepository)
