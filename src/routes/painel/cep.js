export default [
  {
    path: 'ceps',
    name: 'painel.ceps',
    component: () => import('@/views/painel/cep/Index')
  },
  {
    path: 'ceps/create',
    name: 'painel.ceps.create',
    component: () => import('@/views/painel/cep/Form')
  }
]
