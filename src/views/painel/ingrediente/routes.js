export default [
  {
    path: '/ingrediente/categoria',
    name: 'painel.ingrediente.categoria.index',
    text: 'Categorias de Ongredientes',
    component: () => import('./categoria/Index')
  },
  {
    path: '/ingrediente/categoria/create',
    name: 'painel.ingrediente.categoria.create',
    text: 'Criar Categorias de Ingredientes',
    component: () => import('./categoria/Form')
  },
  {
    path: '/ingrediente/categoria/:id/edit',
    name: 'painel.ingrediente.categoria.edit',
    text: 'Editar Categorias de Ingredientes',
    component: () => import('./categoria/Form.vue')
  },
  {
    path: '/ingrediente',
    name: 'painel.ingrediente.index',
    text: 'Ingredientes',
    component: () => import('./Index')
  },
  {
    path: '/ingrediente/create',
    name: 'painel.ingrediente.create',
    text: 'Criar  Ingredientes',
    component: () => import('./Form')
  },
  {
    path: '/ingrediente/:id/edit',
    name: 'painel.ingrediente.edit',
    text: 'Editar  Ingredientes',
    component: () => import('./Form.vue')
  },
]
