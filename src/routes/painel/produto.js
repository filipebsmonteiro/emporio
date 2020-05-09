export default [
  {
    path: 'produto/categoria',
    name: 'painel.produto.categoria.index',
    text: 'Categorias de Produtos',
    component: () => import('@/views/painel/produto/categoria/Index')
  },
  {
    path: 'produto/categoria/create',
    name: 'painel.produto.categoria.create',
    text: 'Criar Categorias de Produtos',
    component: () => import('@/views/painel/produto/categoria/Form')
  },
  {
    path: 'produto/categoria/:id/edit',
    name: 'painel.produto.categoria.edit',
    text: 'Editar Categorias de Produtos',
    component: () => import('@/views/painel/produto/categoria/Form')
  },
  {
    path: 'produto',
    name: 'painel.produto.index',
    text: 'Produtos',
    component: () => import('@/views/painel/produto/Index')
  },
  {
    path: 'produto/create',
    name: 'painel.produto.create',
    text: 'Criar  Produtos',
    component: () => import('@/views/painel/produto/Form')
  },
  {
    path: 'produto/:id/edit',
    name: 'painel.produto.edit',
    text: 'Editar  Produtos',
    component: () => import('@/views/painel/produto/Form')
  },
]
