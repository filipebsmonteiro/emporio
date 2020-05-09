export default [
  {
    path: 'produto/:id',
    name: 'produto.show',
    component: () => import('@/views/produtos/Show')
  },
  {
    path: 'produtos',
    name: 'produtos',
    component: () => import('@/views/produtos/Index')
  },
  {
    path: 'produtos/categoria/:id',
    name: 'produtos.categoria',
    component: () => import('@/views/produtos/Index')
  },
]
