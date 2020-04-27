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
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/dist/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('./views/dist/Register.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'produtod',
      component: SiteLayout,
      children: [
        {
          path: '/produtos',
          name: 'produtos',
          component: () => import('./views/produtos/IndexSide')
        },
        {
          path: '/produtos/categoria/:id',
          name: 'produtos.categoria',
          component: () => import('./views/produtos/Index')
        },
        {
          path: '/carrinho',
          name: 'carrinho',
          component: () => import('./views/carrinho/Index')
        },
      ]
    }
]
})
