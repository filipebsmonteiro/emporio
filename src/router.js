import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import cliente from '@/routes/cliente'
import endereco from '@/routes/endereco'
import institucional from '@/routes/institucional'
import painelCliente from '@/routes/painel/cliente'
import painelCupom from '@/routes/painel/cupom'
import painelIngrediente from '@/routes/painel/ingrediente'
import painelLoja from '@/routes/painel/loja'
import painelProduto from '@/routes/painel/produto'
import painelPedido from '@/routes/painel/pedido'
import painelUsuario from '@/routes/painel/usuario'
import pedido from '@/routes/pedido'
import produto from '@/routes/produto'
import SiteLayout from '@/layout/SiteLayout'
import { isAuthenticatedPainel } from '@/guards'
import APIService from '@/api/APIService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  //scrollBehavior () {
  //  return { x: 0, y: 0 };
  //},

  routes: [
    { path: '*', component: () => import('@/views/NotFound') },

    {
      path: '/painel/login',
      name: 'painel.login',
      component: () => import('@/views/painel/Login'),
      beforeEnter: ($to, $from, $next) => {
        if (APIService._isAuthenticated() && APIService._getDomain() && APIService._getDomain() === 'painel') {
          $next({ name: 'painel.dashboard' })
        }
        $next()
      }
    },
    {
      path: '/painel',
      component: DashboardLayout,
      beforeEnter: isAuthenticatedPainel,
      redirect: {name: 'painel.dashboard'},
      children: [
        { path: 'dashboard', name: 'painel.dashboard', component: () => import('@/views/painel/Dashboard') },
        ...painelCliente,
        ...painelCupom,
        ...painelIngrediente,
        ...painelLoja,
        ...painelProduto,
        ...painelPedido,
        ...painelUsuario
      ]
    },


    { path: '/home', name: 'homepage', component: () => import('@/views/site/HomePage') },
    { path: '/home-slide', name: 'homepage-slide', component: () => import('@/views/site/HomePageSlide') },
    {
      path: '/',
      redirect: '/produtos',
      component: SiteLayout,
      children: [
        { path: '/login', name: 'site.login', component: () => import('@/views/site/Login') },
        ...cliente,
        ...endereco,
        ...pedido,
        ...produto,
        ...institucional
      ]
    }
  ]
})
