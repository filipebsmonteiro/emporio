import { Repository, createRepository } from './repository'

class IngredienteRepository extends Repository {
  endpoint = 'ingrediente'

}

export default new IngredienteRepository()

export const create = createRepository(IngredienteRepository)
