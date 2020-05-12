import moment from 'moment'

class TokenService {
  token = null
  domain = null
  expiration = null
  moment = null
  refresh_endpoint = process.env.VUE_APP_DOMAIN_URL + (this.domain ? `/api${this.domain}/auth/refresh` : '/api/auth/refresh')

  constructor ()  {
    this.moment = moment
    this.token = localStorage.getItem('access_token')
    this.domain = localStorage.getItem('access_token_domain')
    this.expiration = localStorage.getItem('token_expiration')
    if (this.expiration) {
      // Se exsitir vai ser String, então converte
      this.expiration = this.moment(this.expiration)
    }
  }

  _getToken () {
    return this.token
  }

  _setToken (token) {
    this.token = `Bearer ${token}`
    localStorage.setItem('access_token', this.token)
    return this._getToken()
  }

  _getDomain () {
    return this.domain
  }

  _setDomain (domain) {
    this.domain = domain
    localStorage.setItem('access_token_domain', domain)
    return this._getDomain()
  }

  _getExpiration () {
    return this.expiration
  }

  _setExpiration (seconds) {
    this.expiration = this.moment().add(seconds, 'seconds')
    localStorage.setItem('token_expiration', this.expiration.format())
    return this._getExpiration()
  }

  _getRefreshEndPoint () {
    return this.refresh_endpoint
  }

  async _refreshToken ($axios) {
    return await $axios.post(this._getRefreshEndPoint())
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          this._setToken(res.data.access_token)
          this._setExpiration(res.data.expires_in)
          return this._getToken()
        }
      })
  }

  _minutesRemaining () {
    if (this._getExpiration()) {
      return this._getExpiration().diff(this.moment(), 'minutes')
    }
    return null
  }

  _clearToken () {
    this.token = null
    this.expiration = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_expiration')
    localStorage.removeItem('access_token_domain')
  }

  _isAuthenticated () {
    if (this._getToken()){
      return true
    }
    return false
  }

  _isTokenExpired () {
    if (!this._getToken() || this._minutesRemaining() <= 0){
      return true
    }
    return false
  }
}

export default new TokenService()

export const create = TokenService
