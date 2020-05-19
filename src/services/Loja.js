import { Repository, createRepository } from './repository'

class LojaRepository extends Repository {
  endpoint = 'loja'

  enviaSac (params) {
    return this.$axios.post('send-sac', params)
  }
}

export default new LojaRepository()

export const create = createRepository(LojaRepository)
