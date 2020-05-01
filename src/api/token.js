import { axios } from './index'
import moment from 'moment'

class TokenService {
  refresh_endpoint = `${process.env.VUE_APP_DOMAIN_URL}/auth/refresh`
  token = null
  expiration = null
  moment = null

  constructor ($moment = null)  {
    this.moment = $moment
    this.token = localStorage.getItem('access_token')
    this.expiration = localStorage.getItem('token_expiration')
    if (this.expiration) {
      // Se exsitir vai ser String, então converte
      this.expiration = this.moment(this.expiration)
    }
  }

  _setToken (token) {
    this.token = `Bearer ${token}`
    localStorage.setItem('access_token', this.token)
    axios.defaults.headers['Authorization'] = this._getToken()
  }

  _setExpiration (seconds) {
    this.expiration = this.moment().add(seconds, 'seconds')
    localStorage.setItem('token_expiration', this.expiration.format())
  }

  _getToken () {
    if (this._minutesRemaining() && this._minutesRemaining() <= 5) {
      this._refreshToken()
    }
    return this.token
  }

  _getExpiration () {
    return this.expiration
  }

  _minutesRemaining () {
    if (this._getExpiration()) {
      return this._getExpiration().diff(this.moment(), 'minutes')
    }
    return null
  }

  _getRefreshEndPoint () {
    return this.refresh_endpoint
  }

  _refreshToken () {
    axios.post(this._getRefreshEndPoint())
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          this._setToken(res.data.access_token)
          this._setExpiration(res.data.expires_in)

          axios.defaults.headers.common['Authorization'] = this._getToken()
        }
      })
  }

  _clearTokenAndExpiration () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_expiration')
  }
}

export default new TokenService(moment)

export const create = TokenService
