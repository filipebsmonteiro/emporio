import Vue from 'vue'

/**
 * You can register global filters here and use them as a plugin in your main Vue instance
 */


Vue.filter('formatMoney', (value) => {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
});
Vue.filter('formatDate', (value) => {
  return value
  // return moment(String(value)).format('DD/MM/YYYY H:mm:ss')
});
