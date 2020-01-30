export class Repository {
  endpoint = null;

  constructor ($axios) {
    this.$axios = $axios
  }

  fetchAll (params) {
    // return this.$axios.get(`${this.endpoint}`, { params })
    return this.fakePromisse()
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

  fakePromisse () {
    const nome = 'Produto'
    return Promise.resolve({
      data: [
        { id: 1, nome },
        { id: 2, nome },
        { id: 3, nome },
        { id: 4, nome },
        { id: 5, nome },
        { id: 6, nome },
        { id: 7, nome }
      ]
    })
  }
}

export function createRepository (Instance) {
  return $axios => new Instance($axios)
}
