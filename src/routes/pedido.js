export default [
  {
    path: 'pedidos',
    name: 'pedido.index',
    component: () => import('@/views/site/pedido/Index')
  },
  {
    path: 'pedido/carrinho',
    name: 'carrinho',
    component: () => import('@/views/site/pedido/carrinho/Index')
  },
  {
    path: 'pedido/:referencia',
    name: 'pedido.show',
    component: () => import('@/views/site/pedido/Show')
  },
]
