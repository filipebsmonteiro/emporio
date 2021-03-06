import { axios as configAxios } from '@/api/index'

export class Repository {
  endpoint = null

  constructor ($axios = null) {
    this.$axios = $axios
    if (!$axios) {
      this.$axios = configAxios
    }
  }

  fetchPaginated (params) {
    return this.$axios.get(`${this.endpoint}`, { params })
  }

  fetchAll (params) {
    // Lista Todos sem Paginação
    return this.$axios.get(`${this.endpoint}`, { params })
  }

  fetch (id) {
    return this.$axios.get(`${this.endpoint}/${id}`)
  }

  post (params) {
    return this.$axios.post(`${this.endpoint}`, params)
  }

  put (id, params) {
    return this.$axios.put(`${this.endpoint}/${id}`, params)
  }

  delete (id) {
    return this.$axios.delete(`${this.endpoint}/${id}`)
  }
}

export function createRepository (Instance) {
  return $axios => new Instance($axios)
}
