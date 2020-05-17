import { Repository, createRepository } from '@/services/repository'

class PedidoRepository extends Repository {
  endpoint = 'painel/pedido'

}

export default new PedidoRepository()

export const create = createRepository(PedidoRepository)
