export default [
  {
    path: 'pedido',
    name: 'painel.pedido.index',
    component: () => import('@/views/painel/pedido/Index')
  },
  {
    path: 'pedido/:referencia/show',
    name: 'painel.pedido.show',
    component: () => import('@/views/painel/pedido/Show')
  },
]
