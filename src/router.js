import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import cliente from '@/routes/cliente'
import endereco from '@/routes/endereco'
import institucional from '@/routes/institucional'
import painelCliente from '@/routes/painel/cliente'
import painelCupom from '@/routes/painel/cupom'
import painelIngrediente from '@/routes/painel/ingrediente'
import painelProduto from '@/routes/painel/produto'
import painelPedido from '@/routes/painel/pedido'
import pedido from '@/routes/pedido'
import produto from '@/routes/produto'
import SiteLayout from '@/layout/SiteLayout'
import { isAuthenticatedPainel } from '@/guards'
import TokenService from '@/api/token'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  //scrollBehavior (to, from, savedPosition) {
  scrollBehavior () {
    return { x: 0, y: 0 };
  },

  routes: [
    { path: '*', component: () => import('@/views/NotFound') },

    {
      path: '/dist', component: DashboardLayout,
      children: [{ path: '', component: () => import('@/views/dist/Dashboard') }]
    },

    {
      path: '/painel/login',
      name: 'painel.login',
      component: () => import('@/views/painel/Login'),
      beforeEnter: ($to, $from, $next) => {
        if (
          TokenService._isAuthenticated()
          && TokenService._getDomain()
          && TokenService._getDomain() === '/painel'
        ) { $next({ name: 'painel.dashboard' }) }
        $next()
      }
    },
    {
      path: '/painel',
      component: DashboardLayout,
      beforeEnter: isAuthenticatedPainel,
      children: [
        { path: 'dashboard', name: 'painel.dashboard', component: () => import('@/views/painel/Dashboard') },
        ...painelCliente,
        ...painelCupom,
        ...painelIngrediente,
        ...painelProduto,
        ...painelPedido,
      ]
    },

    {
      path: '/',
      redirect: '/produtos',
      component: SiteLayout,
      children: [
        { path: '/', name: 'homepage', component: () => import('@/views/HomePage') },
        ...cliente,
        ...endereco,
        ...pedido,
        ...produto,
        ...institucional
      ]
    }
  ]
})
