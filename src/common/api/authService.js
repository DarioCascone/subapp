import ApiService from 'src/common/api/apiService'

const resource = '/auth'

export default {
  get () {
    return ApiService.get(resource)
  }
}
