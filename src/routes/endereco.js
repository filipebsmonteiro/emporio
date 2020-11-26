export default [
  {
    path: 'endereco/create',
    name: 'endereco.criar',
    component: () => import('@/views/site/cliente/endereco/Form')
  },
  {
    path: 'endereco/:id/edit',
    name: 'endereco.editar',
    component: () => import('@/views/site/cliente/endereco/Form')
  },
  {
    path: 'enderecos',
    name: 'endereco.index',
    component: () => import('@/views/site/cliente/endereco/Index')
  },
]
