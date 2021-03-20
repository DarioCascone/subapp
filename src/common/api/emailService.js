import ApiService from 'src/common/api/apiService'

const resource = '/email'

export default {
  post (email) {
    return ApiService.post(resource + '/send', email)
  }

}
