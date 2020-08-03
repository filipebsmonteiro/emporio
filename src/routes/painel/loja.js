export default [
  {
    path: 'loja',
    name: 'painel.loja.index',
    component: () => import('@/views/painel/loja/Index')
  },
  {
    path: 'loja/create',
    name: 'painel.loja.create',
    component: () => import('@/views/painel/loja/Form')
  },
  {
    path: 'loja/:id/editar',
    name: 'painel.loja.edit',
    component: () => import('@/views/painel/loja/Form')
  },
]
