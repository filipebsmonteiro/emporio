import { Repository, createRepository } from '@/repositories/Base/Repository'

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
