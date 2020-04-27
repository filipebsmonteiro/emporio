export default [
  {
    path: '/painel/produto/categoria',
    name: 'painel.produto.categoria.index',
    text: 'Categorias de Produtos',
    component: () => import('./categoria/Index')
  },
  {
    path: '/painel/produto/categoria/create',
    name: 'painel.produto.categoria.create',
    text: 'Criar Categorias de Produtos',
    component: () => import('./categoria/Form')
  },
  {
    path: '/painel/produto/categoria/:id/edit',
    name: 'painel.produto.categoria.edit',
    text: 'Editar Categorias de Produtos',
    component: () => import('./categoria/Form.vue')
  },
  {
    path: '/painel/produto',
    name: 'painel.produto.index',
    text: 'Produtos',
    component: () => import('./Index')
  },
  {
    path: '/painel/produto/create',
    name: 'painel.produto.create',
    text: 'Criar  Produtos',
    component: () => import('./Form')
  },
  {
    path: '/painel/produto/:id/edit',
    name: 'painel.produto.edit',
    text: 'Editar  Produtos',
    component: () => import('./Form.vue')
  },
]
