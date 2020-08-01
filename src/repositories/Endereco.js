import { Repository, createRepository } from '@/repositories/Base/Repository'

class EnderecoRepository extends Repository {
  endpoint = 'endereco'

  fetchLojaResponsavel (CEP) {
    return this.$axios.get(`${this.endpoint}/getLojaResponsavel/${CEP}`)
  }
}

export default new EnderecoRepository()

export const create = createRepository(EnderecoRepository)
