export default [

  {
    path: '/ingrediente/categoria',
    name: 'ingrediente.categoria.index',
    text: 'Categorias de Ongredientes',
    component: () => import('./categoria/Index')
  },
  {
    path: '/ingrediente/categoria/create',
    name: 'ingrediente.categoria.create',
    text: 'Criar Categorias de Ingredientes',
    component: () => import('./categoria/Form')
  },
  {
    path: '/ingrediente/categoria/:id/edit',
    name: 'ingrediente.categoria.edit',
    text: 'Editar Categorias de Ingredientes',
    component: () => import('./categoria/Form.vue')
  },
  {
    path: '/ingrediente',
    name: 'ingrediente.index',
    text: 'Ingredientes',
    component: () => import('./Index')
  },
  {
    path: '/ingrediente/create',
    name: 'ingrediente.create',
    text: 'Criar  Ingredientes',
    component: () => import('./Form')
  },
  {
    path: '/ingrediente/:id/edit',
    name: 'ingrediente.edit',
    text: 'Editar  Ingredientes',
    component: () => import('./Form.vue')
  },
]
