import { Repository, createRepository } from './repository'

class EnderecoRepository extends Repository {
  endpoint = 'endereco'

  fetchLojaResponsavel (CEP) {
    return this.$axios.get(`${this.endpoint}/getLojaResponsavel/${CEP}`)
  }
}

export default new EnderecoRepository()

export const create = createRepository(EnderecoRepository)
