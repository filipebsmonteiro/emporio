export default [
  {
    path: 'usuarios',
    name: 'painel.usuario.index',
    component: () => import('@/views/painel/usuario/Index')
  },
  {
    path: 'usuario/create',
    name: 'painel.usuario.create',
    component: () => import('@/views/painel/usuario/Form')
  },
  {
    path: 'usuario/:id',
    name: 'painel.usuario.edit',
    component: () => import('@/views/painel/usuario/Form')
  },
]
