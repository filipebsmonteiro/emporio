import { Repository, createRepository } from '@/repositories/Base/Repository'

class IngredienteRepository extends Repository {
  endpoint = 'ingrediente'

}

export default new IngredienteRepository()

export const create = createRepository(IngredienteRepository)
