export default [
  {
    path: 'cliente',
    name: 'painel.cliente.index',
    component: () => import('@/views/painel/cliente/Index')
  },
  {
    path: 'cliente/:id/editar',
    name: 'painel.cliente.edit',
    component: () => import('@/views/painel/cliente/Form')
  },
]
