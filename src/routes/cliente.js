export default [
  {
    path: 'cliente',
    name: 'cliente',
    component: () => import('@/views/cliente/Detalhes')
  },
  {
    path: 'cliente/create',
    name: 'cliente.create',
    component: () => import('@/views/cliente/Form')
  },
  {
    path: 'cliente/editar',
    name: 'cliente.auto_editar',
    component: () => import('@/views/cliente/Form')
  },
  {
    path: 'cliente/fidelidades',
    name: 'fidelidade.index',
    component: () => import('@/views/fidelidade/Index')
  },
  {
    path: 'esqueceu',
    name: 'cliente.esqueceu',
    component: () => import('@/views/cliente/Esqueceu')
  },
  {
    path: 'login',
    name: 'cliente.login',
    component: () => import('@/views/cliente/Login')
  },
]
