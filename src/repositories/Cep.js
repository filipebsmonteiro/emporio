import {Repository, createRepository} from '@/repositories/Base/Repository'

class CepRepository extends Repository {
  endpoint = 'cep'

  fetchAllBairros(params) {
    return this.$axios.get(`${this.endpoint}/bairros`, {params})
  }

}

export default new CepRepository()

export const create = createRepository(CepRepository)
