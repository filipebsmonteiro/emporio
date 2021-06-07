export default [
  {
    path: 'ceps',
    name: 'painel.ceps.index',
    component: () => import('@/views/painel/cep/Index')
  },
  {
    path: 'ceps/create',
    name: 'painel.ceps.create',
    component: () => import('@/views/painel/cep/Form')
  },
  // {
  //   path: 'cep/vincular',
  //   name: 'painel.cep.vincular',
  //   component: () => import('@/views/painel/cliente/Vincular')
  // },
]
