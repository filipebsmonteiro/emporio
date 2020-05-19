import { Repository, createRepository } from './repository'

class AuthRepository extends Repository {
  endpoint = 'painel/auth'

  login(params) {
    return this.$axios.post(`${this.endpoint}/login`, params)
  }

  reset(params) {
    return this.$axios.post(`${this.endpoint}/reset`, params)
  }

  //URLS ABAIXO ESTARÂO LOGADAS ENTÃO NÃO PRECISAO DO PREFIXO PAINEL
  me() {
    return this.$axios.post(`/auth/me`)
  }

  logout() {
    return this.$axios.post(`/auth/logout`)
  }
}

export default new AuthRepository()

export const create = createRepository(AuthRepository)
