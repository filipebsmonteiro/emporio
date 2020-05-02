import { default as axiosPackage } from 'axios'
import TokenService from './token'

axiosPackage.defaults.headers.common['Accept'] = 'application/json'
axiosPackage.defaults.headers.common['Content-Type'] = 'application/json'
axiosPackage.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axiosPackage.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

// Set config defaults when creating the instance
export const axios = axiosPackage.create({
  baseURL: process.env.VUE_APP_DOMAIN_URL,

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
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axios.interceptors.response.use(response => { return response },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      // Verifica Unauthorized ao renovar TOKEN
      if (originalRequest.url === TokenService._getRefreshEndPoint()) {
        window.location.href = `${window.location.origin}/login`
        TokenService._clearTokenAndExpiration()
        return Promise.reject(error);
      }

      const newToken = await TokenService._refreshToken(axios)

      if (newToken){
        axios.defaults.headers.common['Authorization'] = newToken

        // Tenta novamente Request
        return axios(originalRequest);
      }

      /*/ Tenta renovar Token
      axios.post(TokenService._getRefreshEndPoint())
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            TokenService._setToken(res.data.access_token)
            TokenService._setExpiration(res.data.expires_in)

            axios.defaults.headers.common['Authorization'] = TokenService._getToken()

            // Tenta novamente Request
            return axios(originalRequest);
          }
        })*/
    }

    //window.location.href = `${window.location.origin}/`
    // return Error object with Promise
    return Promise.reject(error);
  }
 )
