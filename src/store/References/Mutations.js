export default {
  setCurrent (state, obj) {
    state.current = obj
  },

  setAll (state, array) {
    state.list = array
  },

  setPagination (state, obj) {
    const newObj = {
      per_page: obj.per_page,
      page: obj.page,
      total: obj.total
    }
    state.pagination = newObj
  },

  setLoading (state, boolean) {
    state.isLoading = boolean
  }
}
