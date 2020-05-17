import { Repository, createRepository } from '@/services/repository'

class IngredienteRepository extends Repository {
  endpoint = 'painel/ingrediente'

}

export default new IngredienteRepository()

export const create = createRepository(IngredienteRepository)
