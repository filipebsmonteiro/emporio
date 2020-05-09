import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import cliente from '@/routes/cliente'
import endereco from '@/routes/endereco'
import painelIngrediente from '@/routes/painel/ingrediente'
import painelProduto from '@/routes/painel/produto'
import painelPedido from '@/routes/painel/pedido'
import pedido from '@/routes/pedido'
import produto from '@/routes/produto'
import SiteLayout from '@/layout/SiteLayout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/dist/dashboard',
      redirect: '/dist/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          component: () => import('./views/dist/Dashboard.vue')
        },
      ]
    },

    {
      path: '/painel',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'painel.dashboard',
          component: () => import('@/views/painel/Dashboard')
        },
        ...painelIngrediente,
        ...painelProduto,
        ...painelPedido,

        // Login possui Layout Diferente
        /*{
          path: '/login',
          component: AuthLayout,
          children: [
            {
              path: 'login',
              name: 'painel.login',
              component: () => import('./views/dist/Login.vue')
            },
          ]
        },*/
      ]
    },
    {
      path: '/',
      redirect: 'produtos',
      component: SiteLayout,
      children: [
        ...cliente,
        ...endereco,
        ...pedido,
        ...produto,
        {
          path: '/institucional/contato',
          name: 'contato',
          component: () => import('./views/institucinonal/Contato')
        },
        {
          path: '/',
          name: 'homepage',
          component: () => import('./views/HomePage')
        },
        {
          path: '/institucional/sobre',
          name: 'sobre_nos',
          component: () => import('./views/institucinonal/Sobre')
        },
      ]
    }
]
})
