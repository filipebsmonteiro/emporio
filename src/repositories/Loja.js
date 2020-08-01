import { Repository, createRepository } from '@/repositories/Base/Repository'

class LojaRepository extends Repository {
  endpoint = 'loja'

  enviaSac (params) {
    return this.$axios.post('send-sac', params)
  }
}

export default new LojaRepository()

export const create = createRepository(LojaRepository)
