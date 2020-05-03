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
import VuePusher from 'vue-pusher';
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import { store } from './store'
import '@/plugins/globalFilters'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(ArgonDashboard)
Vue.use(VueSweetalert2)
Vue.use(VueLocalStorage)
Vue.use(VuePusher, {
  api_key: process.env.VUE_APP_PUSHER_KEY,
  options: {
    cluster: 'us2',
    secret: 'a4a7f0cb258b2b6ca69a'
    //encrypted: true,
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
