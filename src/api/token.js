import { axios as mainAXIOS } from './index'
import moment from 'moment'

class TokenService {
  refresh_endpoint = `${process.env.VUE_APP_DOMAIN_URL}/auth/refresh`
  token = null
  expiration = null
  moment = null
  axios = null

  constructor ()  {
    this.moment = moment
    this.axios = mainAXIOS
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

  }

  _clearTokenAndExpiration () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_expiration')
  }
}

export default new TokenService()

export const create = TokenService
