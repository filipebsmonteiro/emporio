export default [
  {
    path: 'cupom',
    name: 'painel.cupom.index',
    component: () => import('@/views/painel/cupom/Index')
  },
  {
    path: 'cupom/create',
    name: 'painel.cupom.create',
    text: 'Criar  Cupom',
    component: () => import('@/views/painel/cupom/Form')
  },
  {
    path: 'cupom/:id/editar',
    name: 'painel.cupom.edit',
    component: () => import('@/views/painel/cupom/Form')
  },
]
