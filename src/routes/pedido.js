export default [
  {
    path: 'pedidos',
    name: 'pedido.index',
    component: () => import('@/views/pedidos/Index')
  },
  {
    path: 'pedido/carrinho',
    name: 'carrinho',
    component: () => import('@/views/carrinho/Index')
  },
  {
    path: 'pedido/:referencia',
    name: 'pedido.show',
    component: () => import('@/views/pedidos/Show')
  },
]
