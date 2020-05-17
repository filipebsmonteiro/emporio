import { Repository, createRepository } from '@/services/repository'

class CupomRepository extends Repository {
  endpoint = 'painel/cupom'

  fetchTipos () {
    return this.$axios.get(`${this.endpoint}/tipos`)
  }
}

export default new CupomRepository()

export const create = createRepository(CupomRepository)
