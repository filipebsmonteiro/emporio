import { Repository, createRepository } from './repository'

class AuthRepository extends Repository {
  endpoint = 'auth'

  login(params) {
    return this.$axios.post(`login`, params)
  }

  logout() {
    return this.$axios.post(`${this.endpoint}/logout`)
  }
}

export default new AuthRepository()

export const create = createRepository(AuthRepository)
