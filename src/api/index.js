import { default as axiosPackage } from 'axios'
import TokenService from '@/api/TokenService'
import { redirectLogin } from '@/guards'

axiosPackage.defaults.headers.common['Accept'] = 'application/json'
axiosPackage.defaults.headers.common['Content-Type'] = 'application/json'
axiosPackage.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axiosPackage.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

// Set config defaults when creating the instance
export const axios = axiosPackage.create({
  baseURL: `${process.env.VUE_APP_DOMAIN_URL}/api`,

  // responseType: 'stream'
  // timeout: 1000,
})

axios.interceptors.request.use(
  async config => {

    if (TokenService._getToken()) {
      if (TokenService._minutesRemaining() && TokenService._minutesRemaining() <= 5) {
        axiosPackage.defaults.headers.common['Authorization'] = TokenService._getToken()
        // Envia com um pacote diferente do Global
        await TokenService._refreshToken(axiosPackage)
      }
      config.headers['Authorization'] = TokenService._getToken()
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

const isTryingRefreshToken = (url) => {
  if (url === TokenService._getRefreshEndPoint()) {
    return true
  }
  return false
}

axios.interceptors.response.use(response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    if (error.response.status === 401) {
      if (isTryingRefreshToken(originalRequest.url)) {
        TokenService._clearToken()
      }

      if (!TokenService._isTokenExpired()) {
        const newToken = await TokenService._refreshToken(axios)
        if (newToken) {
          axios.defaults.headers.common['Authorization'] = newToken
          // Tenta novamente Request
          return axios(originalRequest)
        }
      }
      redirectLogin(originalRequest.url)
    }

    // return Error object with Promise
    return Promise.reject(error)
  }
)
