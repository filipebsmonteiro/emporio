export default {
  setCurrent (state, obj) {
    state.current = obj
  },

  setAll (state, array) {
    state.list = array
  },

  setPagination (state, obj) {
    if (obj.meta){
      obj = obj.meta
    }
    const newObj = {
      per_page: parseInt(obj.per_page),
      page: parseInt(obj.current_page),
      total: parseInt(obj.total)
    }
    state.pagination = newObj
  },

  setLoading (state, boolean) {
    state.isLoading = boolean
  }
}
