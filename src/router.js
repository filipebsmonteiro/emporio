import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import produtoRoutes from '@/views/painel/produto/routes'
import ingredienteRoutes from '@/views/painel/ingrediente/routes'
import SiteLayout from '@/layout/SiteLayout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/painel/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import('./views/dist/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/dist/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import('./views/dist/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import('./views/dist/Tables.vue')
        },
        {
          path: '/docs/produtos',
          name: 'docs.produtos',
          component: () => import('./views/docs/Index')
        },
      ].concat(
        produtoRoutes,
        ingredienteRoutes,
      )
    },
    {
      path: '/',
      redirect: 'dist/login',
      component: AuthLayout,
      children: [
        {
          path: 'dist/login',
          name: 'dist.login',
          component: () => import('./views/dist/Login.vue')
        },
        {
          path: 'dist/register',
          name: 'register',
          component: () => import('./views/dist/Register.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'produtos',
      component: SiteLayout,
      children: [
        {
          path: '/produtos',
          name: 'produtos',
          component: () => import('./views/produtos/Index')
        },
        {
          path: '/produtos/categoria/:id',
          name: 'produtos.categoria',
          component: () => import('./views/produtos/Index')
        },
        {
          path: '/produto/:id',
          name: 'produto.show',
          component: () => import('./views/produtos/Show')
        },
        {
          path: '/carrinho',
          name: 'carrinho',
          component: () => import('./views/carrinho/Index')
        },
        {
          path: '/login',
          name: 'cliente.login',
          component: () => import('./views/cliente/Login')
        },
        {
          path: '/cliente/create',
          name: 'cliente.create',
          component: () => import('./views/cliente/Form')
        },
        {
          path: '/cliente',
          name: 'cliente',
          component: () => import('./views/cliente/Detalhes')
        },
        {
          path: '/cliente/editar',
          name: 'cliente.editar',
          component: () => import('./views/cliente/Form')
        },
        {
          path: '/enderecos',
          name: 'endereco.index',
          component: () => import('./views/endereco/Index')
        },
        {
          path: '/endereco/:id/editar',
          name: 'endereco.editar',
          component: () => import('./views/endereco/Form')
        },
        {
          path: '/pedidos',
          name: 'pedido.index',
          component: () => import('./views/pedidos/Index')
        },
        {
          path: '/pedido/:referencia',
          name: 'pedido.show',
          component: () => import('./views/pedidos/Show')
        },
        {
          path: '/fidelidades',
          name: 'fidelidade.index',
          component: () => import('./views/fidelidade/Index')
        },
      ]
    }
]
})
