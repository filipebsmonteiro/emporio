import Vue from 'vue'
import moment from 'moment'

/**
 * You can register global filters here and use them as a plugin in your main Vue instance
 */


Vue.filter('formatMoney', (value) => {
  value = parseFloat(value)
  if (value){
    return `R$ ${value.toFixed(2).replace('.', ',')}`
  }
  if (value === 0 || value === '0'){
    return `R$ ${value.toFixed(2).replace('.', ',')}`
  }
});
Vue.filter('formatDate', (value, time=true) => {
  if (!time){
    return moment(String(value)).format('DD/MM/YYYY')
  }
  return moment(String(value)).format('DD/MM/YYYY H:mm:ss')
});
