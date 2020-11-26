export default [
  {
    path: '/institucional/contato',
    name: 'contato',
    component: () => import('@/views/site/institucinonal/Contato')
  },
  {
    path: '/institucional/sobre',
    name: 'sobre_nos',
    component: () => import('@/views/site/institucinonal/Sobre')
  },
]
