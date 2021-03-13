import ApiService from 'src/common/api/apiService'

const resource = '/email'

export default {
  send (email) {
    return ApiService.post(resource + '/send', email)
  }

}
