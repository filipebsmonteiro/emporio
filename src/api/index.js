import { default as axiosPackage } from 'axios'
import TokenService from './token'

axiosPackage.defaults.headers.common['Accept'] = 'application/json'
axiosPackage.defaults.headers.common['Authorization'] = TokenService._getToken()
axiosPackage.defaults.headers.common['Content-Type'] = 'application/json'
axiosPackage.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axiosPackage.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

// Set config defaults when creating the instance
export const axios = axiosPackage.create({
  baseURL: process.env.VUE_APP_DOMAIN_URL,

  // responseType: 'stream'
  // timeout: 1000,
})

/*axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = TokenService.getToken();
    return config;
  },
  error => {
    Promise.reject(error)
  }
);*/

axios.interceptors.response.use(response => { return response },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (originalRequest.url === TokenService._getRefreshEndPoint()) {
        window.location.href = `${window.location.origin}/login`
        return Promise.reject(error);
      }

      await TokenService._refreshToken()

      // Try Againg the Request.
      return axios(originalRequest);
    }

    //window.location.href = `${window.location.origin}/`
    // return Error object with Promise
    return Promise.reject(error);
  }
 )
