import { Repository, createRepository } from '@/repositories/Base/Repository'

class PedidoRepository extends Repository {
  endpoint = 'pedido'

}

export default new PedidoRepository()

export const create = createRepository(PedidoRepository)
