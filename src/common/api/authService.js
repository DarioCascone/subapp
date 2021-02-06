import ApiService from 'src/common/api/apiService'

const resource = '/auth'

export default {
  login () {
    return ApiService.get(resource)
  },

  signin (user) {
    return ApiService.post(resource, user)
  }
}
