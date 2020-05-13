import { Repository, createRepository } from './repository'

class PedidoRepository extends Repository {
  endpoint = 'pedido'

  fetchAllPainel(params) {
    return this.$axios.get(`${this.endpoint}/painel`, {params})
  }
}

export default new PedidoRepository()

export const create = createRepository(PedidoRepository)
