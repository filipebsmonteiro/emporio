import { Repository, createRepository } from './repository'

class PedidoRepository extends Repository {
  endpoint = 'pedido'

}

export default new PedidoRepository()

export const create = createRepository(PedidoRepository)
