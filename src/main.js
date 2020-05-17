/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueLocalStorage from 'vue-localstorage'
//import VuePusher from 'vue-pusher'
import VueHtmlToPaper from 'vue-html-to-paper'
import VueFacebookPixel from 'vue-analytics-facebook-pixel'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import { store } from './store'
import '@/plugins/globalFilters'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(ArgonDashboard)
Vue.use(VueSweetalert2)
Vue.use(VueLocalStorage)
if (parseInt(process.env.VUE_APP_FB_PIXEL_ENABLED)) {
  Vue.use(VueFacebookPixel, {
    debug: process.env.VUE_APP_FACEBOOK_DEBUG,
    router
  })
  Vue.analytics.fbq.init(process.env.VUE_APP_FACEBOOK_CODE, {
    em: process.env.VUE_APP_FACEBOOK_EMAIL
  })
}
/*Vue.use(VuePusher, {
  api_key: process.env.VUE_APP_PUSHER_KEY,
  options: {
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    secret: process.env.VUE_APP_PUSHER_SECRET,
    disableStats: true,
    //encrypted: true,
  }
})*/
Vue.use(VueHtmlToPaper, {
  name: '_blank',
  specs: ['fullscreen=yes'],
  styles: ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css']
})
router.beforeEach(async ($to, $from, $next) => {
  /*if ( Object.keys( $to.meta ).length > 0){
    if (
      ($to.meta.perfil && hasPerfil($to.meta.perfil)) ||
      ($to.meta.permission && await can($to.meta.permission))
    ){
      $next()
    }else{
      if ($to.name !== 'Denied') {
        $next({name: 'Denied'})
      }
    }
  }*/
  $next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
