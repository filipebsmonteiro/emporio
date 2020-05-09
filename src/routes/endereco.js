export default [
  {
    path: 'endereco/:id/editar',
    name: 'endereco.editar',
    component: () => import('@/views/endereco/Form')
  },
  {
    path: 'enderecos',
    name: 'endereco.index',
    component: () => import('@/views/endereco/Index')
  },
]
