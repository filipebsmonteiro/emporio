export default [
  {
    path: 'conta',
    name: 'cliente',
    component: () => import('@/views/site/cliente/Detalhes')
  },
  {
    path: 'conta/create',
    name: 'cliente.create',
    component: () => import('@/views/site/cliente/Form')
  },
  {
    path: 'conta/edit',
    name: 'cliente.auto_editar',
    component: () => import('@/views/site/cliente/Form')
  },
  {
    path: 'fidelidade',
    name: 'fidelidade.index',
    component: () => import('@/views/site/cliente/fidelidade/Index')
  },
  {
    path: 'esqueceu',
    name: 'cliente.esqueceu',
    component: () => import('@/views/site/cliente/Esqueceu')
  },
]
