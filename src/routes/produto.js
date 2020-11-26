export default [
  {
    path: 'produto/:id',
    name: 'produto.show',
    component: () => import('@/views/site/cardapio/Show')
  },
  {
    path: 'produtos',
    name: 'produtos',
    component: () => import('@/views/site/cardapio/Index')
  },
  {
    path: 'produtos/categoria/:id',
    name: 'produtos.categoria',
    component: () => import('@/views/site/cardapio/Index')
  },
]
