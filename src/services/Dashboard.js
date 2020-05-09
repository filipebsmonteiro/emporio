import { Repository, createRepository } from './repository'

class DashboardRepository extends Repository {
  endpoint = 'dashboard'

}

export default new DashboardRepository()

export const create = createRepository(DashboardRepository)
