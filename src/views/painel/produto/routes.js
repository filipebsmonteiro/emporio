export default [

  {
    path: '/produto/categoria',
    name: 'produto.categoria.index',
    text: 'Categorias de Produtos',
    component: () => import('./categoria/Index')
  },
  {
    path: '/produto/categoria/create',
    name: 'produto.categoria.create',
    text: 'Criar Categorias de Produtos',
    component: () => import('./categoria/Form')
  },
  {
    path: '/produto/categoria/:id/edit',
    name: 'produto.categoria.edit',
    text: 'Editar Categorias de Produtos',
    component: () => import('./categoria/Form.vue')
  },
  {
    path: '/produto',
    name: 'produto.index',
    text: 'Produtos',
    component: () => import('./Index')
  },
  {
    path: '/produto/create',
    name: 'produto.create',
    text: 'Criar  Produtos',
    component: () => import('./Form')
  },
  {
    path: '/produto/:id/edit',
    name: 'produto.edit',
    text: 'Editar  Produtos',
    component: () => import('./Form.vue')
  },
]
