import { Repository, createRepository } from './repository'

class CupomRepository extends Repository {
  endpoint = 'cupom'

  valida(params) {
    return this.$axios.post(`${this.endpoint}/valida`, params)
  }

}

export default new CupomRepository()

export const create = createRepository(CupomRepository)
