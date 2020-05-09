export default [
  {
    path: 'ingrediente',
    name: 'painel.ingrediente.index',
    text: 'Ingredientes',
    component: () => import('@/views/painel/ingrediente/Index')
  },
  {
    path: 'ingrediente/create',
    name: 'painel.ingrediente.create',
    text: 'Criar  Ingredientes',
    component: () => import('@/views/painel/ingrediente/Form')
  },
  {
    path: 'ingrediente/:id/edit',
    name: 'painel.ingrediente.edit',
    text: 'Editar  Ingredientes',
    component: () => import('@/views/painel/ingrediente/Form')
  },
]
