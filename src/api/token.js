import moment from 'moment'

class TokenService {
  refresh_endpoint = `${process.env.VUE_APP_DOMAIN_URL}/auth/refresh`
  token = null
  expiration = null
  moment = null

  constructor ()  {
    this.moment = moment
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
    return this._getToken()
  }

  _setExpiration (seconds) {
    this.expiration = this.moment().add(seconds, 'seconds')
    localStorage.setItem('token_expiration', this.expiration.format())
    return this._getExpiration()
  }

  _getToken () {
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

  async _refreshToken ($axios) {
    await $axios.post(this._getRefreshEndPoint())
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          this._setToken(res.data.access_token)
          this._setExpiration(res.data.expires_in)
          return this._getToken()
        }
      })
  }

  _clearTokenAndExpiration () {
    this.token = null
    this.expiration = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_expiration')
  }
}

export default new TokenService()

export const create = TokenService
