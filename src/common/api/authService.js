import ApiService from 'src/common/api/apiService'

const resource = '/auth'

export default {
  login () {
    return ApiService.get(resource)
  },

  signup (user) {
    return ApiService.put(resource + '/signup', user)
  }
}
