import { Repository, createRepository } from './repository'

class DashboardRepository extends Repository {
  endpoint = 'dashboard'

  fetchQuantidade(params) {
    return this.$axios.get(`${this.endpoint}/quantidade`, {params})
  }

  fetchCards(params) {
    return this.$axios.get(`${this.endpoint}/cards`, {params})
  }
}

export default new DashboardRepository()

export const create = createRepository(DashboardRepository)
