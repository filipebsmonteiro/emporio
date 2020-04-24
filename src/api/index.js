import { default as axiosPackage } from 'axios'

axiosPackage.defaults.headers.common['Accept'] = 'application/json'
axiosPackage.defaults.headers.common['Content-Type'] = 'application/json'
axiosPackage.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axiosPackage.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

// Set config defaults when creating the instance
export const axios = axiosPackage.create({
  baseURL: 'http://dev.lojavirtual.local/api',

  // responseType: 'stream'
  // timeout: 1000,
});

